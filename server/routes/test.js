const express = require('express');

const router = express.Router();
// const db = require('../model/pool');

router.get('/', async (req, res) => {
  // const [{ price }] = await db.query('SELECT price from point where name = "100"');
  // console.log(price);
  console.log(req.headers.authorization);
  res.send({
    success: true,
    message: 'priceset!!!',
    // price,
  });
});

module.exports = router;
