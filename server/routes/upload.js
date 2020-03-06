const express = require('express');

const router = express.Router();

const db = require('../model/pool');
const upload = require('../config/multer');

// userImg
router.post('/', upload.single('image'), async (req, res, next) => {
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

module.exports = router;
