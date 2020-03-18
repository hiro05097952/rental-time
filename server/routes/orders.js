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
    const orders = await db.query(`SELECT orderId, qty, o.type, startTime, o.createTime, o.status,
    title, meetingPlace, p.description, price,
    u.name, slogan, u.img
    FROM orderList o, product p, user u
    WHERE o.${req.query.isSeller ? 'sellerId' : 'buyerId'} = "${req.session.user.userId}"
    && o.productId = p.productId
    && o.${req.query.isSeller ? 'buyerId' : 'sellerId'} = u.userId
    ORDER BY createTime desc`);

    orders.forEach((item) => {
      item.img = covertToBase64(item.img);
    });

    res.send({
      success: true,
      orders,
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

module.exports = router;
