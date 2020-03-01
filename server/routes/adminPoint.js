const express = require('express');

const router = express.Router();
const uuidv1 = require('uuid/v1');

const db = require('../model/pool');
const validate = require('../config/validate');

router.post('/', async (req, res, next) => {
  const { error } = validate.addNewPointValidate(req.body);
  if (error) {
    return next(error.message);
  }
  if (req.session.user && req.session.user.userId !== 'ef478ab0-3df0-11ea-a8be-5552618d4519') {
    return next(new Error().message = '不是管理員');
  }
  try {
    await db.query('INSERT INTO point SET ?', {
      pointId: uuidv1(),
      ...req.body,
    });
    res.send({
      success: true,
      message: '新增點數卷成功',
    });
  } catch (err) {
    next(err.sqlMessage);
  }
});


module.exports = router;
