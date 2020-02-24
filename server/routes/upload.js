const express = require('express');
const multer = require('multer');

const router = express.Router();

const db = require('../model/pool');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
  fileFilter(req, file, callback) {
    if (!file.mimetype.match(/^image/)) {
      callback(new Error().message = '檔案格式錯誤');
    } else {
      callback(null, true);
    }
  },
});

// userImg
router.post('/', upload.single('image'), async (req, res, next) => {
  // console.log('file => ', req.file);
  if (req.query.productId) {
    return next();
  }
  try {
    await db.query(`UPDATE user SET img = ? WHERE userId
    = "${req.session.user.userId}"`, req.file.buffer);

    const img = Buffer.from(req.file.buffer).toString('base64');
    res.send({
      success: true,
      message: '上傳圖片成功',
      img,
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});

// product coverImg
router.post('/', upload.single('image'), async (req, res, next) => {
  // console.log('file => ', req.file);
  try {
    const result = await db.query(`SELECT * FROM product WHERE productId = "${req.query.productId}" && userId = "${req.session.user.userId}"`);
    if (!result.length) { return next(new Error().message = '查無此服務'); }

    await db.query(`UPDATE product SET coverImg = ? WHERE userId
    = "${req.session.user.userId}" && productId =
    "${req.query.productId}"`, req.file.buffer);

    const coverImg = Buffer.from(req.file.buffer).toString('base64');
    res.send({
      success: true,
      message: '上傳圖片成功',
      coverImg,
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
