/* eslint-disable unicorn/prefer-starts-ends-with */
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter(req, file, callback) {
    if (!file.mimetype.match(/^image/)) {
      callback(new Error().message = '檔案格式錯誤');
    } else {
      callback(null, true);
    }
  },
});

module.exports = upload;
