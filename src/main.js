// vue 套件
import Vue from 'vue'
import axios from 'axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate, { Validator } from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'

// 自訂
import App from './App.vue'
import router from './router'
import './bus.js'
import currencyFilter from './components/filters/Currency'

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
// clipboard
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true
Validator.localize('zh_TW', zhTWValidate)
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)

// 判斷是否為跨域存取
// Access-Control-Allow-Credentials
// 用來解決CROS
axios.defaults.withCredentials = true
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(res => {
      console.log(res.data)
      if (res.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
