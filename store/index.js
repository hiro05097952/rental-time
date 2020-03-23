import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutations = {
  UPDATE_USER(state, userInfo) {
    state.userInfo = userInfo;
  },
  TOGGLE_MOBILE_NAV(state, isOpen) {
    state.mobileNav = isOpen;
  },
  TOGGLE_SCREEN(state, isOpen) {
    state.maxScreen = isOpen;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    try {
      if (req.session?.user) {
        const { data } = await $axios.get('/api/login', {
          withCredentials: true,
        });
        commit('UPDATE_USER', data.userInfo);
      }
    } catch ({ response }) {
      // console.log('nuxt init!! =>', response.data.message);
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
  mobileNav: false,
  maxScreen: false,
});

export default {
  state,
  mutations,
  actions,
};
