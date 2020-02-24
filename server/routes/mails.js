const express = require('express');

const router = express.Router();

const db = require('../model/pool');

router.get('/', async (req, res, next) => {
  try {
    const mail = await db.query(`SELECT m.toUserId, u.name toUserName, u.img toUserImg, 
    m.fromUserId, m.fromUserName, m.fromUserImg, m.content, m.createTime
    FROM (SELECT u.name fromUserName, u.img fromUserImg, m.content, m.createTime, m.touserId, m.fromUserId
    FROM mail m, user u
    WHERE m.fromUserId = u.userId) m, user u
    WHERE m.toUserId = u.userId && (m.toUserId = "${req.session.user.userId}" || m.fromUserId = "${req.session.user.userId}")`);
    mail.forEach((item) => {
      item.type = item.fromUserId === req.session.user.userId ? 1 : 0;
    });
    res.send({
      success: true,
      mail,
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
