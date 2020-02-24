import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutations = {
  CHANGE_LOGIN_BOX(state, payload) {
    state.loginBox = payload;
  },
};

export const actions = {
};

export const state = () => ({
  loginBox: false,
});

export default {
  state,
  mutations,
  actions,
};
