import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
  connection: process.env.BASE_URL,
}));
