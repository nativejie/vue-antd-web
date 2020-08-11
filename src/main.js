import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './core/lazy_use'

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
