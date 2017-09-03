// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ('../node_modules/vuetify/dist/vuetify.min.css')
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import AuthService from './services/AuthService'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    authenticated: AuthService.loggedIn()
  },
  mutations: {
    login: state => state.authenticated = true,
    logout: state => state.authenticated = false
  },
   getters: {
     auth: state => {
       return state.authenticated;
     }
   }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
