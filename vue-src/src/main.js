// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ('../node_modules/vuetify/dist/vuetify.min.css')
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import VueSwal from './swal'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(VueSwal)
Vue.config.productionTip = false

sync(store, router)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
