const express = require('express');

const router = express.Router();

const db = require('../model/pool');

router.get('/', async (req, res, next) => {
  try {
    const orders = await db.query(`SELECT orderId, qty, o.type, startTime, o.createTime, o.status,
    title, meetingPlace, p.description, price, atLeast,
    u.name, slogan
    FROM orderList o, product p, user u
    WHERE o.${req.query.isSeller ? 'sellerId' : 'buyerId'} = "${req.session.user.userId}"
    && o.productId = p.productId
    && o.${req.query.isSeller ? 'buyerId' : 'sellerId'} = u.userId
    ORDER BY createTime desc`);

    res.send({
      success: true,
      orders,
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

module.exports = router;
