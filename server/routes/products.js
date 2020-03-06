const express = require('express');

const router = express.Router();

const db = require('../model/pool');

function covertToBase64(buf) {
  if (Buffer.isBuffer(buf)) {
    return Buffer.from(buf).toString('base64');
  }
  return buf;
}

// exclude u.id, u.uuid eamil password emailVerified u.createTime
router.get('/', async (req, res, next) => {
  try {
    const products = await db.query(`SELECT title, category, type, meetingPlace,
    coverImg, p.createTime, atLeast, p.productId, p.userId, img, name, slogan, identified, price
    FROM product p, user u
    WHERE p.userId = u.userId ${req.query.limit ? `limit ${req.query.limit}` : ''}`);

    // convert blob to base64
    await products.forEach((item) => {
      item.coverImg = covertToBase64(item.coverImg);
      item.img = covertToBase64(item.img);
      item.type = item.type.split(',');
    });

    res.send({
      success: true,
      products,
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});


module.exports = router;
