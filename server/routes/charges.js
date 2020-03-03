// ecpay
const express = require('express');

const router = express.Router();

const db = require('../model/pool');

// 儲值紀錄
router.get('/', async (req, res, next) => {
  try {
    const charges = await db.query(`SELECT chargeId, userId, c.pointId, createTime, name, price FROM charge c, point p
    WHERE c.userId = "${req.session.user.userId}" && c.pointId = p.pointId;`);

    res.send({
      success: true,
      charges,
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

module.exports = router;
