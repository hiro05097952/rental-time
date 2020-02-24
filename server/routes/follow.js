const express = require('express');

const router = express.Router();

const db = require('../model/pool');

router.post('/:followedUserId', async (req, res, next) => {
  try {
    if (req.params.followedUserId === req.session.user.userId) {
      return next(new Error().message = '請勿追蹤自己');
    }
    const checkUser = await db.query(`SELECT * FROM user WHERE userId = "${req.params.followedUserId}"`);
    if (!checkUser.length) {
      return next(new Error().message = '查無此使用者');
    }
    const checkFollowed = await db.query(`SELECT * FROM follow
    WHERE followUserId = "${req.session.user.userId}" && followedUserId = "${req.params.followedUserId}"`);
    if (checkFollowed.length) {
      return next(new Error().message = '已追蹤此使用者');
    }
    const sqlData = {
      followedUserId: req.params.followedUserId,
      followUserId: req.session.user.userId,
    };
    await db.query('INSERT INTO follow SET ?', sqlData);
    res.send({
      success: true,
      message: '追蹤成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

router.delete('/:followedUserId', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM follow
    WHERE followUserId = "${req.session.user.userId}" && followedUserId = "${req.params.followedUserId}"`);
    if (!result.length) {
      return next(new Error().message = '尚未追蹤過');
    }
    await db.query(`DELETE FROM follow
    WHERE followUserId = "${req.session.user.userId}" && followedUserId = "${req.params.followedUserId}"`);
    res.send({
      success: true,
      message: '取消追蹤成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
