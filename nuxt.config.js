const whitelister = require('purgecss-whitelister');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '時販機 じはんき',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '空閑時間怎麼處理呢？ 在時販機上，您可以自由販賣或購買時間，一單位為 30 分鐘，不同的主題可以讓你選擇精進自己、分享快樂又或是殺時間的娛樂。快來看看吧！' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { property: 'og:title', content: 'Go Where' },
      { property: 'og:description', content: '空閑時間怎麼處理呢？ 在時販機上，您可以自由販賣或購買時間，一單位為 30 分鐘，不同的主題可以讓你選擇精進自己、分享快樂又或是殺時間的娛樂。快來看看吧！' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1526688442562-41eb8259db9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
      { property: 'og:image:width', content: '600px' },
      { property: 'og:image:height', content: '600px' },
      { property: 'og:url', content: 'https://rental-time.herokuapp.com/' },
      { property: 'og:site_name', content: '時販機 じはんき' },
      { property: 'og:locale', content: 'zh_TW' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#FFCD12',
    height: '3px',
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/global.scss', lang: 'scss' },
    'sweetalert2/dist/sweetalert2.min.css',
    'quill/dist/quill.snow.css',
    'croppie/croppie.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/sweetalert2',
    '~/plugins/vee-validate',
    '~/plugins/g-filter.js',
    '~/plugins/axios.js',
    { mode: 'client', src: '~plugins/v-calendar.js' },
    { mode: 'client', src: '~plugins/google-oauth.js' },
    { mode: 'client', src: '~/plugins/vue-socket.js' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-purgecss',
  ],
  purgeCSS: {
    whitelist: whitelister(([
      'node_modules/quill/dist/quill.snow.css',
      'node_modules/sweetalert2/dist/sweetalert2.min.css',
      'node_modules/croppie/croppie.css',
    ])),
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL,
    https: true,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    // extend(config, { isDev, isClient }) {
    // },
  },
  router: {
    middleware: 'auth',
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
  env: {
    google_clientId: process.env.google_clientId,
    fb_appId: process.env.fb_appId,
    BASE_URL: process.env.BASE_URL,
  },
};
