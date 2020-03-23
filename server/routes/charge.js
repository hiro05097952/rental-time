// ecpay
const express = require('express');

const router = express.Router();
const Ecpay = require('ecpay-payment');
const hash = require('hash.js');
const randomBytes = require('randombytes');

const db = require('../model/pool');
const validate = require('../config/validate');

function checkMacValueConverter(config, HashKey, HashIV) {
  if (config.CheckMacValue) {
    delete config.CheckMacValue;
  }

  // 按照 A ~ Z 排序
  const keyArr = Object.keys(config).sort();
  let sortedStr = '';
  keyArr.forEach((item) => {
    sortedStr += `${item}=${config[item]}&`;
  });

  // 加上 HashKey 與 HashIV
  sortedStr = `HashKey=${HashKey}&${sortedStr}HashIV=${HashIV}`;

  // 轉成 encode url + 小寫
  sortedStr = encodeURIComponent(sortedStr).toLowerCase();

  // 轉換表
  sortedStr = sortedStr.replace(/%2d/g, '-').replace(/%5f/g, '_')
    .replace(/%2e/g, '.').replace(/%2a/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%20/g, '+');

  // Sha256 加密，轉大寫
  sortedStr = hash.sha256().update(sortedStr).digest('hex').toUpperCase();

  return sortedStr;
}

function getNow() {
  function getCovert(value, limit = 10) {
    return value < limit ? `0${value}` : value;
  }
  const dt = new Date();
  const month = getCovert(dt.getMonth() + 1);
  const date = getCovert(dt.getDate());
  const hours = getCovert(dt.getHours());
  const minutes = getCovert(dt.getMinutes());
  const seconds = getCovert(dt.getSeconds());

  // format: 2020/02/27 13:15:10
  return `${dt.getFullYear()}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}

router.post('/', async (req, res, next) => {
  const { error } = validate.chargePointValidate(req.body);
  if (error) {
    return next(error.message);
  }
  try {
    const [point] = await db.query(`SELECT price, name FROM point WHERE pointId = "${req.body.pointId}"`);
    if (!point) {
      return next(new Error().message = '不明的錯誤');
    }

    const parameters = {
      MerchantTradeNo: randomBytes(8).toString('hex'), // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
      ReturnURL: `${process.env.BASE_URL}/api/charge/server`, // 後端網址
      ClientBackURL: `${process.env.BASE_URL}/account/charge`, // 導回前台網址
      CustomField1: req.session.user.userId, // userId
      CustomField2: req.body.pointId, // pointId
      EncryptType: '1', // 加密類型 => SHA256
      MerchantTradeDate: getNow(),
      TotalAmount: String(point.price), // 轉成字串
      ItemName: point.name,
      TradeDesc: 'Rental Time Point Charge',
    };

    // 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解 //
    const invoice = {
      // RelateNumber: 'PLEASE MODIFY',  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
      // CustomerID: 'MEM_0000001',  //會員編號
      // CustomerIdentifier: '',   //統一編號
      // CustomerName: '測試買家',
      // CustomerAddr: '測試用地址',
      // CustomerPhone: '0123456789',
      // CustomerEmail: 'johndoe@test.com',
      // ClearanceMark: '2',
      // TaxType: '1',
      // CarruerType: '',
      // CarruerNum: '',
      // Donation: '2',
      // LoveCode: '',
      // Print: '1',
      // InvoiceItemName: '測試商品1|測試商品2',
      // InvoiceItemCount: '2|3',
      // InvoiceItemWord: '個|包',
      // InvoiceItemPrice: '35|10',
      // InvoiceItemTaxType: '1|1',
      // InvoiceRemark: '測試商品1的說明|測試商品2的說明',
      // DelayDay: '0',
      // InvType: '07'
    };

    const create = new Ecpay();
    const htm = create.payment_client.aio_check_out_all(parameters, invoice);
    res.send(htm);
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

router.post('/server', async (req, res, next) => {
  try {
    console.log('ecpay return server => ', req.body);

    const chargeId = req.body.MerchantTradeNo;
    const userId = req.body.CustomField1;
    const pointId = req.body.CustomField2;

    // 查驗檢查碼
    if (req.body.CheckMacValue
      !== checkMacValueConverter(req.body, process.env.ECPAY_HashKey, process.env.ECPAY_HashIV)) {
      console.log('server 檢查碼不合格');
      res.send('0');
      return;
    }

    await db.query('INSERT INTO charge SET ?', {
      chargeId,
      userId,
      pointId,
    });
    const [point] = await db.query(`SELECT point FROM user WHERE userId = "${userId}"`);
    await db.query(`UPDATE user SET point = ${+req.body.TradeAmt + +point.point} WHERE userId = "${userId}"`);

    res.send('1');
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

module.exports = router;
