const express = require('express');

const router = express.Router();
const htmlEncode = require('js-htmlencode');

const validate = require('../config/validate');
const db = require('../model/pool');
const upload = require('../config/multer');

function covertToBase64(passBuf) {
  if (Buffer.isBuffer(passBuf)) {
    const buf = Buffer.from(passBuf);
    return buf.includes('http') ? buf.toString() : buf.toString('base64');
  }
  return passBuf;
}

// exclude u.id, u.uuid eamil password emailVerified u.createTime
router.get('/:productId', async (req, res, next) => {
  try {
    const [product] = await db.query(`SELECT title, category, type, meetingPlace,
    p.description productDescription, u.description userdescription, coverImg, p.createTime,
    p.productId, p.userId, img, name, address, slogan, identified, price
    FROM product p, user u WHERE p.userId = u.userId && productId = ${req.params.productId}`);

    if (!product) {
      return next(new Error().message = '查無此商品');
    }
    // convert blob to base64
    product.coverImg = covertToBase64(product.coverImg);
    product.img = covertToBase64(product.img);
    product.productDescription = htmlEncode.htmlDecode(product.productDescription);
    product.type = product.type.split(',');

    res.send({
      success: true,
      product,
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});
router.post('/', upload.single('coverImg'), async (req, res, next) => {
  const { error } = validate.productValidate(req.body);
  if (error) { return next(error.message); }
  try {
    const sqlData = {
      ...req.body,
      description: htmlEncode.htmlEncode(req.body.description),
      userId: req.session.user.userId,
    };
    if (req.file) {
      sqlData.coverImg = req.file.buffer;
    }

    await db.query('INSERT INTO product SET ?', sqlData);
    res.send({
      success: true,
      message: '新增服務成功',
    });
  } catch (err) {
    next(err.sqlMessage || err);
  }
});

router.put('/:productId', upload.single('coverImg'), async (req, res, next) => {
  const { error } = validate.productValidate(req.body);
  if (error) { return next(error.message); }

  try {
    const [result] = await db.query(`SELECT * FROM product WHERE productId = "${req.params.productId}"
    && userId = "${req.session.user.userId}"`);

    if (!result) {
      return next(new Error().message = '查無此服務');
    }

    const description = htmlEncode.htmlEncode(req.body.description);

    await db.query(`UPDATE product SET title = "${req.body.title}", description = "${description}",
    type = "${req.body.type}", meetingPlace = "${req.body.meetingPlace}", category = "${req.body.category}",
    price = "${req.body.price}" ${req.file ? ', coverImg = ?' : ''}
    WHERE productId = "${req.params.productId}" && userId = "${req.session.user.userId}"`, req.file ? [req.file.buffer] : '');
    res.send({
      success: true,
      message: '編輯服務成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM product WHERE productId = "${req.params.productId}" && userId = "${req.session.user.userId}"`);
    if (!result.length) { return next(new Error().message = '查無此服務'); }

    await db.query(`DELETE FROM product WHERE productId = "${req.params.productId}" && userId = "${req.session.user.userId}"`);
    res.send({
      success: true,
      message: '刪除服務成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

module.exports = router;
