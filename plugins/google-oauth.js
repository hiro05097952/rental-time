import GAuth from 'vue-google-oauth2';
import Vue from 'vue';

const gauthOption = {
  clientId: process.env.google_clientId,
  scope: 'profile email',
  prompt: 'select_account',
};

Vue.use(GAuth, gauthOption);
