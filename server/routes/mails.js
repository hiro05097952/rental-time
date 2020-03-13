const express = require('express');

const router = express.Router();

const db = require('../model/pool');

function covertToBase64(passBuf) {
  if (Buffer.isBuffer(passBuf)) {
    const buf = Buffer.from(passBuf);
    return buf.includes('http') ? buf.toString() : buf.toString('base64');
  }
  return passBuf;
}
router.get('/', async (req, res, next) => {
  try {
    const mails = await db.query(`SELECT m.toUserId, u.name toUserName, u.img toUserImg, 
    m.fromUserId, m.fromUserName, m.fromUserImg, m.content, m.createTime
    FROM (SELECT u.name fromUserName, u.img fromUserImg, m.content, m.createTime, m.touserId, m.fromUserId
    FROM maxTimeMail m, user u
    WHERE m.fromUserId = u.userId) m, user u
    WHERE m.toUserId = u.userId && (m.toUserId = "${req.session.user.userId}" || m.fromUserId = "${req.session.user.userId}")
    order by createTime desc`);

    mails.forEach((item) => {
      item.type = item.fromUserId === req.session.user.userId ? 1 : 0;
      item.fromUserImg = covertToBase64(item.fromUserImg);
      item.toUserImg = covertToBase64(item.toUserImg);
    });
    res.send({
      success: true,
      mails,
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
