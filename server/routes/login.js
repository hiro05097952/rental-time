/* eslint-disable camelcase */
const express = require('express');
const hash = require('hash.js');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const router = express.Router();

const validate = require('../config/validate');
const db = require('../model/pool');
const nodeMailer = require('../config/nodemailer');

router.post('/', async (req, res, next) => {
  if (req.body.token || req.body.accessToken) {
    return next();
  }
  const { error } = validate.loginValidate(req.body);
  if (error) { return next(error.message); }

  try {
    const [user] = await db.query(`SELECT userId, emailVerified, point FROM user WHERE email = "${req.body.email}"
    && password = "${hash.sha256().update(req.body.password).digest('hex')}"`);
    // console.log('result =>', result);
    if (!user) {
      return next(new Error().message = '帳號或密碼錯誤');
    }
    req.session.user = {
      emailVerified: user.emailVerified,
      userId: user.userId,
      point: user.point,
    };
    res.send({
      success: true,
      message: '登入成功',
      userInfo: {
        userId: user.userId,
        emailVerified: user.emailVerified,
        point: user.point,
      },
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

async function googleVerify(token) {
  // verify token
  const client = new OAuth2Client(process.env.google_clientId);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.google_clientId,
  });
  return ticket.getPayload();
}
async function fbVerify(token) {
  const { data } = await axios.get(`https://graph.facebook.com/v6.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${token}`);
  return {
    sub: data.id,
    name: data.name,
    email: data.email,
    email_verified: true,
    picture: data.picture.data.url,
  };
}

router.post('/', async (req, res, next) => {
  // console.log('google oauth => ', req.body);
  try {
    // verify token
    const {
      sub, name, email, email_verified, picture,
    } = req.body.token ? await googleVerify(req.body.token) : await fbVerify(req.body.accessToken);

    const [result] = await db.query(`SELECT * FROM user WHERE email = "${email}"`);

    // sign up
    if (!result) {
      await db.query('INSERT INTO user SET ?', {
        userId: sub,
        name,
        email,
        password: sub,
        emailVerified: email_verified,
        img: picture,
      });
      if (!email_verified) {
        await nodeMailer.sendSignUpEmail({
          name,
          email,
          url: `${process.env.BASE_URL}/user/emailverify/${sub}`,
        });
      }
    }

    // use third sign in to verify email
    if (result && !result.emailVerified && email_verified) {
      await db.query(`UPDATE user SET emailVerified = ${1} WHERE email = "${email}"`);
    }

    req.session.user = {
      emailVerified: result ? result.emailVerified : 1,
      userId: result ? result.userId : sub,
      point: result ? result.point : 0,
    };

    res.send({
      success: true,
      message: '登入成功',
      userInfo: {
        userId: req.session.user.userId,
        emailVerified: req.session.user.emailVerified,
        point: req.session.user.point,
      },
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

router.get('/', async (req, res, next) => {
  // console.log('session => ', req.session);
  if (!req.session.user) {
    return next(new Error().message = '尚未登入');
  }
  const [user] = await db.query(`SELECT * FROM user WHERE userId = "${req.session.user.userId}"`);
  req.session.user = {
    userId: user.userId,
    point: user.point,
    emailVerified: user.emailVerified,
  };
  if (!user) {
    return next(new Error().message = '尚未通過驗證');
  }
  res.send({
    success: true,
    message: '登入中',
    userInfo: {
      userId: user.userId,
      emailVerified: user.emailVerified,
      point: user.point,
    },
  });
});

module.exports = router;
