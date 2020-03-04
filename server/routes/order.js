// ecpay
const express = require('express');

const router = express.Router();
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const randombytes = require('randombytes');

const db = require('../model/pool');
const validate = require('../config/validate');
const nodeMailer = require('../config/nodemailer');

function timeConverter(time) {
  function getCovert(value, limit = 10) {
    return value < limit ? `0${value}` : value;
  }
  const dt = new Date(time);
  const month = getCovert(dt.getMonth() + 1);
  const date = getCovert(dt.getDate());
  const hours = getCovert(dt.getHours());
  const minutes = getCovert(dt.getMinutes());
  const seconds = getCovert(dt.getSeconds());

  // format: 2020-02-27 13:15:10
  return `${dt.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

// 儲值紀錄
router.post('/', async (req, res, next) => {
  const { error } = validate.orderValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    // point check
    const [product] = await db.query(`SELECT price, atLeast, userId sellerId
    FROM product WHERE productId = "${req.body.productId}"`);
    const [{ buyerPoint }] = await db.query(`SELECT point buyerPoint FROM user
    WHERE userId = "${req.session.user.userId}"`);

    if (buyerPoint < product.price * req.body.qty) {
      return next(new Error().message = '點數餘額不足，請至會員頁面儲值點數');
    }

    // update buyer point
    await db.query(`UPDATE user SET point = "${buyerPoint - product.price * req.body.qty}"
    WHERE userId = "${req.session.user.userId}"`);

    // add new order list
    const config = {
      orderId: uuidv1(),
      buyerId: req.session.user.userId,
      sellerId: product.sellerId,
      productId: req.body.productId,
      qty: Number(req.body.qty),
      type: req.body.type,
      status: 'pending', // pending => success => finish / cancel
      startTime: timeConverter(Number(req.body.startTime)),
    };

    await db.query('INSERT INTO orderList SET ?', config);
    res.send({
      success: true,
      message: '已送出訂單',
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

// 審核
router.post('/access', async (req, res, next) => {
  // orderId
  const { error } = validate.editOrderValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const [order] = await db.query(`SELECT status, startTime, o.type, qty,
    p.atLeast, p.title, p.price
    u.name sellerName, u.email sellerEmail, u.point sellerPoint
    FROM orderList o, product p, user u
    WHERE orderId = "${req.body.orderId}"
    && o.productId = p.productId
    && o.sellerId = u.userId
    && o.sellerId = "${req.session.user.userId}"`);

    const [buyer] = await db.query(`SELECT u.name buyerName, u.email buyerEmail
    FROM orderList o, user u
    WHERE o.orderId = "${req.body.orderId}"
    && o.buyerId = u.userId
    && o.sellerId = "${req.session.user.userId}"`);

    if (!order) {
      return next(new Error().message = '權限不夠');
    }
    if (order.status !== 'pending') {
      return next(new Error().message = '無法更改狀態');
    }
    if (+new Date(order.startTime) - +new Date() < 0) {
      return next(new Error().message = '已逾時');
    }

    // update order status
    await db.query(`UPDATE order SET status = "access" WHERE orderId = "${req.body.orderId}"`);

    // update seller point
    await db.query(`UPDATE user SET point = "${order.sellerPoint + order.price * order.qty}"
    WHERE userId = "${req.session.user.userId}"`);

    // send chat link
    if (order.type !== 'meeting') {
      await Promise.all([
        nodeMailer.sendChatEmail({
          email: order.sellerEmail,
          name: order.sellerName,
          title: order.title,
          url: `${process.env.BASE_URL}/chat/?roomId="${req.body.orderId}"`,
        }),
        nodeMailer.sendChatEmail({
          email: buyer.buyerEmail,
          name: buyer.buyerName,
          title: order.title,
          url: `${process.env.BASE_URL}/chat/?roomId="${req.body.orderId}"`,
        }),
      ]);
    }
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

// 開始前排程

router.post('/finish', async (req, res, next) => {
  // orderId
  const { error } = validate.editOrderValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const { orderId } = req.body;

    const [order] = await db.query(`SELECT * FROM orderList WHERE orderId = "${orderId}"
    && sellerId = "${req.session.user.userId}"`);

    if (!order) {
      return next(new Error().message = '請由販物主來完成訂單');
    }
    if (order.status !== 'access') {
      return next(new Error().message = '無法更改狀態');
    }

    await db.query(`UPDATE orderList SET status = "finish" WHERE orderId = "${orderId}"`);

    res.send({
      success: true,
      message: '販物完成',
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

router.post('/cancel', async (req, res, next) => {
  const { error } = validate.editOrderValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const { orderId } = req.body;
    let isSeller;

    const check = await db.query(`SELECT * FROM orderList
    WHERE sellerId = "${req.session.user.userId}"
    && orderId = "${req.body.orderId}"`);
    if (check.length) {
      isSeller = true;
    }
    const [order] = await db.query(`SELECT status, startTime, o.type, qty,
    p.atLeast, p.title, p.price,
    u.point
    FROM orderList o, product p, user u
    WHERE orderId = "${orderId}"
    && o.productId = p.productId
    && o.${isSeller ? 'sellerId' : 'buyerId'} = u.userId
    && o.${isSeller ? 'sellerId' : 'buyerId'} = "${req.session.user.userId}"`); // 需判斷 session 為買方還賣方

    const [anotherUser] = await db.query(`SELECT u.point
    FROM orderList o, user u
    WHERE o.orderId = "${orderId}"
    && o.${isSeller ? 'buyerId' : 'sellerId'} = u.userId
    && o.${isSeller ? 'buyerId' : 'sellerId'} = "${req.session.user.userId}"`); // 需判斷 session 為買方還賣方

    if (order.status === 'finish' || order.status === 'cancel') {
      return next(new Error().message = '無法更改訂單狀態');
    }

    // 未審核狀態雙方可直接取消訂單
    if (order.status === 'pending') {
      // update another point
      await db.query(`UPDATE user SET
      point = ${(isSeller ? anotherUser.point : order.point) + order.qty * order.price}
      WHERE userId = "${isSeller ? anotherUser.point : order.point}"`);
    }

    // 懲罰機制
    if (order.status === 'success') {
      // update user point
      await db.query(`UPDATE user SET
      point = ${(isSeller ? order.point : anotherUser.point) - order.qty * order.price}
      WHERE userId = "${isSeller ? order.point : anotherUser.point}"`);
      // update another point
      await db.query(`UPDATE user SET
      point = ${(isSeller ? anotherUser.point : order.point) + order.qty * order.price * 0.75}
      WHERE userId = "${isSeller ? anotherUser.point : order.point}"`);
    }

    // update order status
    await db.query(`UPDATE orderList SET status = "cancel" WHERE orderId = "${orderId}"`);

    res.send({
      success: true,
      message: '成功取消訂單',
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

module.exports = router;
