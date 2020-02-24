const express = require('express');

const router = express.Router();

const db = require('../model/pool');

router.post('/:productId', async (req, res, next) => {
  try {
    const product = await db.query(`SELECT * FROM likes WHERE productId = "${req.params.productId}"`);
    if (!product.length) {
      return next(new Error().message = '查無此商品');
    }
    const result = await db.query(`SELECT * FROM likes
    WHERE userId = "${req.session.user.userId}" && productId = "${req.params.productId}"`);
    if (result.length) {
      return next(new Error().message = '已按讚過');
    }
    const sqlData = {
      productId: req.params.productId,
      userId: req.session.user.userId,
    };
    await db.query('INSERT INTO likes SET ?', sqlData);
    res.send({
      success: true,
      message: '按讚成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM likes
    WHERE userId = "${req.session.user.userId}" && productId = "${req.params.productId}"`);
    if (!result.length) {
      return next(new Error().message = '尚未按讚過');
    }
    await db.query(`DELETE FROM likes WHERE userId = "${req.session.user.userId}" && productId = "${req.params.productId}"`);
    res.send({
      success: true,
      message: '取消按讚成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
