import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './components/element'
import './assets/css/style.css'
import './icons'

Vue.config.productionTip = false
Vue.use(element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
