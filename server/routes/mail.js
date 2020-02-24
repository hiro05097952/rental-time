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
    const mail = await db.query(`SELECT m.toUserId, u.name toUserName, u.img toUserImg, 
    m.fromUserId, m.fromUserName, m.fromUserImg, m.content, m.createTime
    FROM (SELECT u.name fromUserName, u.img fromUserImg, m.content, m.createTime, m.touserId, m.fromUserId
    FROM mail m, user u
    WHERE m.fromUserId = u.userId) m, user u
    WHERE m.toUserId = u.userId &&
    (m.toUserId = "${req.session.user.userId}" || m.fromUserId = "${req.session.user.userId}") &&
    (m.fromUserId = "${req.params.userId}" || m.toUserId = "${req.params.userId}")`);
    res.send({
      success: true,
      mail,
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
