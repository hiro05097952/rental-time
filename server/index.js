const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
// const logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
require('dotenv').config();

const middlewareRouter = require('./config/middleware');
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
const pointsRouter = require('./routes/points');
const adminPointRouter = require('./routes/adminPoint');
const chargeRouter = require('./routes/charge');
const chargesRouter = require('./routes/charges');
const orderRouter = require('./routes/order');
const ordersRouter = require('./routes/orders');

const socketStart = require('./socket/socket');
const testRouter = require('./routes/test');

const app = express();

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

// cors
const whitelist = ['https://postgate.ecpay.com.tw'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, origin);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// self
// app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

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
  app.use(middlewareRouter);
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
  // 新增點數卷、取得點數卷
  app.use('/api/admin/point', adminPointRouter);
  app.use('/api/points', pointsRouter);
  // 儲值點數
  app.use('/api/charges', chargesRouter);
  app.use('/api/charge', chargeRouter);
  app.use('/api/order', orderRouter);
  app.use('/api/orders', ordersRouter);

  app.use('/api/test', testRouter);

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
  const server = app.listen(port, host);

  // socket
  socketStart(server);

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
