const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy();

  res.send({
    success: true,
    message: '成功登出',
  });
});

module.exports = router;
