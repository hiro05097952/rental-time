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
    const [{ buyerPoint }] = await db.query(`SELECT point FROM user WHERE userId = "${req.session.user.userId}"`);
    const [{ sellerPoint }] = await db.query(`SELECT point FROM user WHERE userId = "${product.sellerId}"`);
    if (buyerPoint < product.price * req.body.qty) {
      return next(new Error().message = '點數餘額不足，請至會員頁面儲值點數');
    }
    // NG Date check ?

    // update point ( seller & buyer )
    await db.query(`UPDATE user SET point = "${buyerPoint - product.price * req.body.qty}"
    WHERE userId = "${req.session.user.userId}"`);
    await db.query(`UPDATE user SET point = "${sellerPoint + product.price * req.body.qty}"
    WHERE userId = "${product.sellerId}"`);

    // add new order list
    const config = {
      orderId: uuidv1(),
      buyerId: req.session.user.userId,
      sellerId: product.sellerId,
      productId: req.body.productId,
      qty: Number(req.body.qty),
      status: 'pending', // pending => process => finish / cancel
      startTime: timeConverter(Number(req.body.startTime)),
    };

    await db.query('INSERT INTO orderList SET ?', config);
    res.send({
      success: true,
      message: '購買成功',
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

// 活動開始進行
router.post('/start', async (req, res, next) => {
  const { error } = validate.editOrderValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const [order] = await db.query(`SELECT status, startTime, o.type, qty, p.atLeast, p.title,
    u.name sellerName, u.email sellerEmail
    FROM orderList o, product p, user u
    WHERE orderId = "${req.body.orderId}"
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
    const now = new Date();
    const startTime = new Date(order.startTime);
    if (+startTime - +now > 1000 * 60 * 10) {
      return next(new Error().message = '請十分鐘前再開啟聊天室');
    }
    await db.query(`UPDATE order SET status = "process" WHERE orderId = "${req.body.orderId}"`);

    // 寄送 && 回傳 聊天室連結
    if (order.type !== 'meeting') {
      const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * order.atLeast * order.qty) + (60 * 60), // 寬裕一小時
        room: randombytes(8).toString('hex'),
        orderId: req.body.orderId,
      }, 'rental_time_chat');
      console.log('token => ', token);

      await nodeMailer.sendChatEmail({
        email: order.sellerEmail,
        name: order.sellerName,
        title: order.title,
        url: `${process.env.BASE_URL}/chat/${token}`,
      });
      await nodeMailer.sendChatEmail({
        email: buyer.buyerEmail,
        name: buyer.buyerName,
        title: order.title,
        url: `${process.env.BASE_URL}/chat/${token}`,
      });
    }
    res.send({
      success: true,
      message: '販物開始進行',
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

router.post('/finish', async (req, res, next) => {
  // token || orderId
  const { error } = validate.editOrderValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const { orderId } = req.body || jwt.verify(req.body.token, 'rental_time_chat');
    console.log(orderId);
    const [order] = await db.query(`SELECT * FROM orderList WHERE orderId = "${orderId}"
    && sellerId = "${req.session.user.userId}"`);

    if (!order) {
      return next(new Error().message = '請由販物主結束會議');
    }
    if (order.status !== 'process') {
      return next(new Error().message = '無法更改狀態');
    }

    await db.query(`UPDATE orderList SET status = "finish" WHERE orderId = "${orderId}"`);

    res.send({
      success: true,
      message: '販物結束',
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
    const { orderId } = req.body || jwt.verify(req.body.token, 'rental_time_chat');
    const [order] = await db.query(`SELECT status, startTime, o.type, qty, p.atLeast,
    p.title, p.price, u.point sellerPoint
    FROM orderList o, product p, user u
    WHERE orderId = "${orderId}"
    && o.sellerId = u.userId
    && o.sellerId = "${req.session.user.userId}"`);

    const [{ buyerPoint, buyerId }] = await db.query(`SELECT u.point buyerPoint, o.buyerId
    FROM orderList o, user u
    WHERE o.orderId = "${orderId}"
    && o.buyerId = u.userId
    && o.sellerId = "${req.session.user.userId}"`);

    if (!order) {
      return next(new Error().message = '請由販物主結束會議');
    }
    if (order.status !== 'pending') {
      return next(new Error().message = '無法更改狀態');
    }

    await db.query(`UPDATE user SET point = ${buyerPoint + order.qty * order.price}
    WHERE userId = "${req.session.user.userId}"`);
    await db.query(`UPDATE user SET point = ${order.sellerPoint - order.qty * order.price}
    WHERE userId = "${buyerId}"`);
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
