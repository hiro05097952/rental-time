const express = require('express');

const router = express.Router();

const db = require('../model/pool');
const validate = require('../config/validate');

router.post('/:toUserId', async (req, res, next) => {
  const { error } = validate.mailValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const checkUser = await db.query(`SELECT * FROM user WHERE userId = "${req.params.toUserId}"`);
    if (!checkUser.length) {
      return next(new Error().message = '查無使用者');
    }
    const sqlData = {
      toUserId: req.params.toUserId,
      fromUserId: req.session.user.userId,
      content: req.body.content,
    };
    await db.query('INSERT INTO mail SET ?', sqlData);
    res.send({
      success: true,
      message: '成功寄出信件',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const mail = await db.query(`SELECT * FROM mail WHERE
    (toUserId = "${req.session.user.userId}" && fromUserId = "${req.params.userId}")
    || (fromUserId = "${req.session.user.userId}" && toUserId = "${req.params.userId}")`);

    const [userInfo] = await db.query(`SELECT name, userId, img FROM user WHERE userId = "${req.params.userId}"`);

    res.send({
      success: true,
      mail,
      userInfo,
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});


module.exports = router;
