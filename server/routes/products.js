const express = require('express');

const router = express.Router();

const db = require('../model/pool');


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

    await products.forEach((item) => {
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
