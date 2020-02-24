const express = require('express');
const router = express.Router();

let verificationWhiteList = [
  {
    // Create Session
    path: '/api/login',
    method: 'POST'
  },
  {
    // Sign up
    path: '/api/user',
    method: 'POST'
  },
  {
    // Get Login Status
    path: '/api/user',
    method: 'GET'
  },
  {
    path: '/api/logout',
    method: 'GET'
  },
];
router.use((req, res, next) => {
  // 白名單
  const varifyWhite = verificationWhiteList.some((item) => {
    return (req.path.includes(item.path) && req.method === item.method) ? true : undefined
  });
  if (varifyWhite) {
    next();
    return;
  };

  // 是否登入過
  // console.log('session: ', req.session.user);
  if (!req.session.user) {
    next(new Error().message = '請先登入會員');
    return;
  }
  // admin 路由
  if (req.path.includes('admin')) {
    if (req.session.user.isAdmin) {
      next();
      return;
    };
    next(new Error().message = '尚未擁有管理員權限');
  } else {
    if (req.session.user.emailVerified) {
      next();
      return;
    }
    next(new Error().message = '請先認證電子郵件'); 
  };
});

module.exports = router;
