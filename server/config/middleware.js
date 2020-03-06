const express = require('express');

const router = express.Router();

const verificationWhiteList = [
  {
    // Create Session
    path: '/api/login',
    method: 'POST',
  },
  {
    // Sign up
    path: '/api/user',
    method: 'POST',
  },
  {
    path: '/api/user/emailverify',
    method: 'GET',
  },
  {
    // fogot password
    path: '/password/reset',
    method: 'GET',
  },
  {
    // Get Login Status
    path: '/api/login',
    method: 'GET',
  },
  {
    path: '/api/logout',
    method: 'GET',
  },
  {
    path: '/api/product',
    method: 'GET',
  },
  {
    path: '/api/products',
    method: 'GET',
  },
  {
    path: '/api/test',
    method: 'GET',
  },
];
router.use((req, res, next) => {
  // 白名單
  const varifyWhite = verificationWhiteList.some((item) => (req.path.includes(item.path)
  && req.method === item.method)) || !req.path.includes('api');
  if (varifyWhite) {
    return next();
  }

  // 是否登入過
  // console.log('session: ', req.session.user);
  if (!req.session.user) {
    return next(new Error().message = '請先登入會員');
  }
  // admin 路由
  if (req.path.includes('admin')) {
    if (req.session.user.userId === '138dde00-404f-11ea-8022-0d170347330a') {
      return next();
    }
    next(new Error().message = '尚未擁有管理員權限');
  } else {
    if (req.session.user.emailVerified) {
      return next();
    }
    next(new Error().message = '請先認證電子郵件');
  }
});

module.exports = router;
