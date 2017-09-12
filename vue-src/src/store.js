import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'

const user = JSON.parse(localStorage.getItem('user')) || null;

const userId = user ? user.id : null;

Vue.use(Vuex);

const state = {
  authenticated: AuthService.loggedIn(),
  userId: userId
};

const mutations =  {
  login: state => state.authenticated = true,
  logout: state => state.authenticated = false,
  setUserId: (state, value) => state.userId = value
};

const getters = {
  auth: state => {
    return state.authenticated;
  },
  user: state => {
    return state.userId;
  }
};

const actions = {
  setUserId({ commit }, value) {
    commit('setUserId', value)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
