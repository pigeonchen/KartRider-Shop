import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import productsModule from './products'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    messages: [],
    carts: [],
    favorites: []
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    // alert
    MESSAGES (state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp
      })
    },
    REMOVEMESSAGEWITHTIMIMG (state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1)
        }
      })
    },
    REMOVEMESSAGE (state, num) {
      state.messages.splice(num, 1)
    },
    // favorites
    FAVORITES (state) {
      state.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    },
    CHANGEFAVORITES (state, product) {
      if (state.favorites.length === 0 || state.favorites.every(item => item.id !== product.id)) {
        state.favorites.push(product)
      } else {
        // 存在則移除
        const index = state.favorites.findIndex(item => item.id === product.id)
        state.favorites.splice(index, 1)
      }
      // 儲存至 localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    REMOVEFAVORITE (state, product) {
      const index = state.favorites.indexOf(product)
      state.favorites.splice(index, 1)
      // 儲存至 localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    // cart
    CARTS (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    isLoading (context) {
      context.commit('LOADING', status)
    },
    // Alert
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('MESSAGES', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVEMESSAGEWITHTIMIMG', timestamp)
      }, 5000)
    },
    removeMessage (context, num) {
      context.commit('REMOVEMESSAGE', num)
    },
    // favorite
    getFavorites (context) {
      context.commit('FAVORITES')
    },
    changeFavorite (context, product) {
      context.commit('CHANGEFAVORITES', product)
      context.dispatch('getFavorites')
    },
    removeFavorItem (context, product) {
      context.commit('REMOVEFAVORITE', product)
      // 重新整理
      context.dispatch('getFavorites')
    },
    // 購物車
    getCart (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/`
      context.commit('LOADING', true)
      axios.get(url).then((res) => {
        context.commit('CARTS', res.data.data)
        context.commit('LOADING', false)
      })
    },
    addCart (context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/`
      context.commit('LOADING', true)
      const cart = {
        product_id: id,
        qty
      }
      axios.post(url, { data: cart }).then((res) => {
        if (res.data.success) {
          context.dispatch('updateMessage', { message: '已增加至購物車', status: 'success' })
          context.dispatch('getCart')
        } else {
          context.dispatch('updateMessage', { message: '增加至購物車失敗', status: 'danger' })
        }
        context.commit('LOADING', false)
      })
    },
    removeCartItem (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(url).then((res) => {
        if (res.data.success) {
          context.dispatch('updateMessage', { message: '已刪除項目', status: 'success' })
          context.dispatch('getCart')
        } else {
          context.dispatch('updateMessage', { message: '未能成功刪除', status: 'danger' })
          context.dispatch('getCart')
        }
        context.commit('LOADING', false)
      })
    }
  },
  modules: {
    productsModule
  }
})
