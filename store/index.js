import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutations = {
  CHANGE_LOGIN_BOX(state, isOpen) {
    state.loginBox = isOpen;
  },
  UPDATE_USER(state, userInfo) {
    state.userInfo = userInfo;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    console.log('nuxtServerInit Session => ', req.session);
    if (req.session && req.session.user) {
      commit('UPDATE_USER', req.session.user);
      return;
    }
    try {
      console.log('取登入狀態 API !!');
      const { data } = await this.$axios.get('/api/login', {
        withCredentials: true,
      });
      commit('UPDATE_USER', data.userInfo);
    } catch ({ response }) {
      console.log(response.data.message);
    }
  },
};

export const state = () => ({
  loginBox: false,
  userInfo: {},
});

export default {
  state,
  mutations,
  actions,
};
