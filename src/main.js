// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './filters'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Meta)
Vue.use(Notifications, { velocity })

Vue.config.errorHandler = function (err, vm, info) {
  console.log('Uncaught error occurred and has been logged.')
  console.log(err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
