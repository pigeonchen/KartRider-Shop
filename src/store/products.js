
import axios from 'axios'

export default {
  strict: true,
  state: {
    products: [],
    categories: [],
    pagination: [],
    category: ''
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (status, payload) {
      status.pagination = payload
    },
    CATEGORIES (state, payload) {
      const categories = new Set()
      payload.forEach(item => { categories.add(item.category) })
      state.categories = Array.from(categories).sort((a, b) => {
        const aChar = a.substr(0, 1) === '競' ? 1 : 0
        const bChar = a.substr(0, 1) === '道' ? 1 : 0
        return bChar - aChar
      })
    },
    CATEGORY (state, category) {
      state.category = category
    }
  },
  actions: {
    getPageProducts (context, { page = 1, category }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      context.commit('LOADING', true)
      axios.get(url).then((res) => {
        console.log(res)
        context.commit('PRODUCTS', res.data.products)
        context.commit('CATEGORIES', res.data.products)
        context.commit('CATEGORY', category)
        context.commit('PAGINATION', res.data.pagination)
        context.commit('LOADING', false)
      })
    },
    getCategoryProducts (context, category) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(url).then((res) => {
        context.commit('PRODUCTS', res.data.products)
        context.commit('CATEGORIES', res.data.products)
        context.commit('CATEGORY', category)
        context.commit('LOADING', false)
      })
    },
    getProduct (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      axios.get(url).then((res) => {
        context.commit('PRODUCT', res.data.product)
      })
    },
    goToCategory (context, category) {
      context.commit('CATEGORY', category)
    }
  },
  // computed
  getters: {
    products (state) {
      return state.products
    },
    pagination (state) {
      return state.pagination
    },
    categories (state) {
      return state.categories
    }
  }
}
