const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    success: true,
    message: 'testest',
  });
});

module.exports = router;
