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

// exclude u.id, u.uuid eamil password emailVerified u.createTime
router.get('/', async (req, res, next) => {
  try {
    const products = await db.query(`SELECT title, category, type, meetingPlace,
    coverImg, p.createTime, p.productId, p.userId, img, name, slogan, identified, price
    FROM product p, user u
    WHERE p.userId = u.userId
    ${req.query.search ? `&& (p.title LIKE '%${req.query.search}%'
    || p.description LIKE '%${req.query.search}%' || u.name LIKE '%${req.query.search}%')` : ''}
    ${req.query.limit ? `limit ${req.query.limit}` : ''}`);

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
