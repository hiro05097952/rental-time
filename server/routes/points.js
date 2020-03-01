const express = require('express');

const router = express.Router();

const db = require('../model/pool');

router.get('/', async (req, res, next) => {
  try {
    const points = await db.query('SELECT * from point');
    res.send({
      success: true,
      points,
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
