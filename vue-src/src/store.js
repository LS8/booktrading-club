import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'

const user =  null;

const userId = user ? user.id : null;

Vue.use(Vuex);

const state = {
  token: null,
  user: null,
  isUserLoggedIn: false
};

const mutations =  {
  setUser: (state, user) => state.user = user,
  setToken (state, token) {
    state.token = token;
    if (token) {
      state.isUserLoggedIn = true;
    } else {
      state.isUserLoggedIn = false;
    }
  }
};

const actions = {
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  }
}

const getters = {
  isUserLoggedIn: state => {
    return state.isUserLoggedIn;
  },
  user: state => {
    return state.user;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
