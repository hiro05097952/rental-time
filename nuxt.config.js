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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
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
    baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'https://localhost:3000',
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
      key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
    },
  },
};
