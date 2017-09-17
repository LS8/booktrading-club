import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'

const user =  null;

const userId = user ? user.id : null;

Vue.use(Vuex);

const state = {
  authenticated: AuthService.loggedIn(),
  userId: userId,
  token: null,
  user: null,
  isUserLoggedIn: false
};

const mutations =  {
  login: state => state.authenticated = true,
  logout: state => state.authenticated = false,
  setUserId: (state, value) => state.userId = value,
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
  setUserId({ commit }, value) {
    commit('setUserId', value)
  },
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  }
}

const getters = {
  auth: state => {
    return state.authenticated;
  },
  user: state => {
    return state.userId;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
