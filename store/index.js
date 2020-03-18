import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutations = {
  UPDATE_USER(state, userInfo) {
    state.userInfo = userInfo;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    // console.log('nuxtServerInit Session => ', req.session.user);
    if (req.session && req.session.user) {
      commit('UPDATE_USER', {
        emailVerified: req.session.user.emailVerified,
        point: req.session.user.point,
        userId: req.session.user.userId,
      });
    }
  },
  async logout({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/logout');
      commit('UPDATE_USER', {});
      this.$swal.fire({
        icon: 'success',
        title: data.message,
      });
    } catch ({ response }) {
      this.$swal.fire({
        icon: 'error',
        title: response.data.message,
      });
    }
  },
};

export const state = () => ({
  userInfo: {},
});

export default {
  state,
  mutations,
  actions,
};
