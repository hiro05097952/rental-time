const express = require('express');
const hash = require('hash.js');

const router = express.Router();

const validate = require('../config/validate');
const db = require('../model/pool');

router.post('/', async (req, res, next) => {
  const { error } = validate.loginValidate(req.body);
  if (error) { return next(error.message); }

  try {
    const result = await db.query(`SELECT userId, emailVerified FROM user WHERE email = "${req.body.email}"
    && password = "${hash.sha256().update(req.body.password).digest('hex')}"`);
    // console.log('result =>', result);
    if (!result.length) {
      return next(new Error().message = '查無使用者');
    }
    req.session.user = {
      emailVerified: result[0].emailVerified,
      userId: result[0].userId,
    };
    res.send({
      success: true,
      message: '登入成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

router.get('/', (req, res, next) => {
  console.log('session => ', req.session);
  if (!req.session.user) {
    return next(new Error().message = '尚未登入');
  }
  if (req.session.user && !req.session.user.emailVerified) {
    return next(new Error().message = '尚未通過驗證');
  }
  res.send({
    success: true,
    message: '登入中',
    userInfo: {
      emailVerified: req.session.emailVerified,
    },
  });
});

module.exports = router;
