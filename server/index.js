const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// const io = require('socket.io')();
require('dotenv').config();
// require('./socket/socket')(io);

// const middlewareRouter = require('./config/middleware');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const productRouter = require('./routes/product');
const productsRouter = require('./routes/products');
const uploadRouter = require('./routes/upload');
const likeRouter = require('./routes/like');
const followRouter = require('./routes/follow');
const mailRouter = require('./routes/mail');
const mailsRouter = require('./routes/mails');

const app = express();
// 把 socket.io 綁在 app 下
// app.io = io;

app.use(session({
  secret: 'rental-time',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24 * 3, // 3 days
  },
  store: new MySQLStore({
    connectionLimit: process.env.connectionLimit,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  }),
}));

// self
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // self
  // app.use(middlewareRouter);
  app.use('/api/user', userRouter);
  app.use('/api/login', loginRouter);
  app.use('/api/logout', logoutRouter);
  app.use('/api/product', productRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/upload', uploadRouter);
  app.use('/api/like', likeRouter);
  app.use('/api/follow', followRouter);
  app.use('/api/mail', mailRouter);
  app.use('/api/mails', mailsRouter);

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(500).send({
      success: false,
      message: err,
    });
  });

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
