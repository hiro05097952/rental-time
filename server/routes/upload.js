const express = require('express');

const router = express.Router();

const db = require('../model/pool');
const multer = require('../config/multer');
const uploadImg = require('../config/storage');

// userImg
router.post('/', multer.single('image'), async (req, res, next) => {
  try {
    const imgUrl = await uploadImg(req.file, req.session.user.userId);

    await db.query(`UPDATE user SET img = ? WHERE userId
    = "${req.session.user.userId}"`, imgUrl);

    res.send({
      success: true,
      message: '上傳圖片成功',
      img: imgUrl,
    });
  } catch (err) {
    next(err && err.sqlMessage);
  }
});

module.exports = router;
