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
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
// 自訂
import App from './App.vue'
import router from './router'
import './bus.js'
import currencyFilter from './components/filters/Currency'

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(VueAwesomeSwiper)
// clipboard
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true
Validator.localize('zh_TW', zhTWValidate)
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.directive('scroll', {
  inserted: function (el, binding) {
    const f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

// 判斷是否為跨域存取
// Access-Control-Allow-Credentials
// 用來解決CROS
axios.defaults.withCredentials = true
new Vue({
  router,
  methods: {
    scrollToWhere (el) {
      console.log(el)
      const scrollY = window.scrollY
      const totalHeight = scrollY + window.innerHeight
      console.log(el.offsetTop, el.height)
      if (el.offsetTop + (el.height / 2) < totalHeight) {
        el.classList.add('active')
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(res => {
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
