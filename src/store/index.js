// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      logedUser: '',
    },
    login: false,
    register: false
  },
  getters: {
    getUser: state => {
      return state.user.logedUser;
    }
  },
  mutations: {
    changeName(state, payload) {
      state.user.logedUser = payload
    },
    changeLogin(state, payload) {
      state.login = payload
    },
    changeRegister(state, payload) {
      state.register = payload
    }
  },
  actions: {}
});