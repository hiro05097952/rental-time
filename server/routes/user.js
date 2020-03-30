const express = require('express');

const router = express.Router();
const uuidv1 = require('uuid/v1');
const hash = require('hash.js');
const jwt = require('jsonwebtoken');
const htmlEncode = require('js-htmlencode');

const db = require('../model/pool');
const validate = require('../config/validate');
const nodeMailer = require('../config/nodemailer');

// user basic
router.get('/', async (req, res, next) => {
  try {
    const [user] = await db.query(`SELECT img, name, address, slogan, email, description,
    emailVerified, identified, point, password FROM user WHERE userId = "${req.session.user.userId}"`);

    if (req.session.user.userId === user.password) {
      user.signInType = 'third';
    }
    delete user.password;
    if (user.description) {
      user.description = htmlEncode.htmlDecode(user.description.replace(/<br \/>/g, '\n'));
    }

    res.send({
      success: true,
      user,
    });
  } catch (err) {
    next(err && err.sqlMessage);
  }
});

router.post('/', async (req, res, next) => {
  const { error } = validate.signupValidate(req.body);
  if (error) { return next(error.message); }

  try {
    const result = await db.query(`SELECT * FROM user WHERE email = "${req.body.email}"`);
    if (result.length) {
      return next(new Error().message = '此 E-mail 已註冊過');
    }

    const sqlData = {
      ...req.body,
      password: hash.sha256().update(req.body.password).digest('hex'),
      userId: uuidv1(),
    };
    delete sqlData.passwordConfirmation;

    await db.query('INSERT INTO user SET ?', sqlData);
    await nodeMailer.sendSignUpEmail({
      name: sqlData.name,
      email: sqlData.email,
      url: `${process.env.BASE_URL}/api/user/emailverify/${sqlData.userId}`,
    });
    res.send({
      success: true,
      message: '註冊成功',
    });
  } catch (err) {
    next(err && err.sqlMessage);
  }
});

router.put('/', async (req, res, next) => {
  const { error } = validate.editUserValidate(req.body);
  if (error) { return next(error.message); }

  try {
    const userDescription = htmlEncode.htmlEncode(req.body.description).trim().replace(/\n/g, '<br />');

    await db.query(`UPDATE user SET name = "${req.body.name}", address = "${req.body.address}",
    slogan = "${req.body.slogan}", description = "${userDescription}"
    WHERE userId = "${req.session.user.userId}"`);
    res.send({
      success: true,
      message: '成功編輯會員基料',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

// emailverify
router.get('/emailverify/:userId', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM user WHERE userId = "${req.params.userId}"`);
    if (!result.length) {
      return next(new Error().message = '查無使用者');
    }
    // console.log(result);

    await db.query(`UPDATE user SET emailVerified = "1" WHERE userId = "${req.params.userId}"`);
    // 轉址
    res.redirect(`${process.env.BASE_URL}`);
  } catch (err) {
    return next(err.sqlMessage);
  }
});

router.post('/emailverify', async (req, res, next) => {
  try {
    const [user] = await db.query(`SELECT name, email, userId FROM user WHERE userId = "${req.session.user.userId}"`);
    if (!user) {
      return next(new Error().message = '查無使用者');
    }
    // console.log(result);

    await nodeMailer.sendSignUpEmail({
      name: user.name,
      email: user.email,
      url: `${process.env.BASE_URL}/api/user/emailverify/${user.userId}`,
    });

    res.send({
      success: true,
      message: '請至信箱驗證',
    });
  } catch (err) {
    return next(err.sqlMessage || err);
  }
});

// password change
router.post('/password', async (req, res, next) => {
  const { error } = validate.changePasswordValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const [currentData] = await db.query(`SELECT password FROM user WHERE userId = "${req.session.user.userId}"`);
    if (hash.sha256().update(req.body.currentPassword).digest('hex') !== currentData.password) {
      return next(new Error().message = '密碼錯誤');
    }
    if (currentData.password === req.body.currentPassword) {
      return next(new Error().message = '第三方登入不能更改密碼');
    }
    await db.query(`UPDATE user SET password = "${hash.sha256().update(req.body.newPassword).digest('hex')}"
    WHERE userId = "${req.session.user.userId}"`);
    res.send({
      success: true,
      message: '成功更改密碼',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

// forgot password
router.post('/password/reset', async (req, res, next) => {
  if (req.headers.authorization) {
    return next();
  }
  const { error } = validate.forgotPasswordValidate(req.body, 'email');
  if (error) {
    return next(error.message);
  }
  try {
    const [checkUser] = await db.query(`SELECT * FROM user WHERE email = "${req.body.email}"`);
    if (!checkUser) {
      return next(new Error().message = '此 Email 未註冊過');
    }
    if (checkUser.userId === checkUser.password) {
      return next(new Error().message = '請使用第三方登入');
    }
    const token = await jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 1 days
      email: req.body.email,
    }, process.env.jwtForgotPasswordSecret);
    // console.log('token => ', token);
    await nodeMailer.sendForgotPasswordEmail({
      email: req.body.email,
      name: checkUser.name,
      // 轉址到前端輸入更改密碼頁面
      url: `${process.env.BASE_URL}/login/forgot_password/${token}`,
    });
    res.send({
      success: true,
      message: '已寄送至信箱',
    });
  } catch (err) {
    next(err && err.sqlMessage);
  }
});

router.post('/password/reset', async (req, res, next) => {
  const { error } = validate.forgotPasswordValidate(req.body, 'newPassword');
  if (error) {
    return next(error.message);
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.jwtForgotPasswordSecret);
    const checkUser = await db.query(`SELECT * FROM user WHERE email = "${decoded.email}"`);
    if (!checkUser.length) {
      return next(new Error().message = '此 Email 未註冊過');
    }
    await db.query(`UPDATE user SET password = "${hash.sha256().update(req.body.newPassword).digest('hex')}"
    WHERE userId = "${checkUser[0].userId}"`);
    res.send({
      success: true,
      message: '重置密碼成功',
    });
  } catch (err) {
    next(err.sqlMessage || err.message);
  }
});

module.exports = router;
