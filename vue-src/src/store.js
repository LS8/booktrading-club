import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'

Vue.use(Vuex);

const state = {
  authenticated: AuthService.loggedIn()
};

const mutations =  {
  login: state => state.authenticated = true,
  logout: state => state.authenticated = false
};

const getters = {
  auth: state => {
    return state.authenticated;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations
})
