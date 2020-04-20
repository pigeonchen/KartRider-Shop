<template>
  <div>
    <NavBar></NavBar>
    <main>
      <Alert></Alert>
      <div class="container" style="min-height: 81vh">
        <div class="row mb-3">
          <div class="col-12">
            <div class="background">
              <div class="text mx-2">
                <h1 class="text-white text-center p-3">輸入優惠碼打 9 折</h1>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" aria-current="page">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item" aria-current="page">商城</li>
          </ol>
        </nav>
        <div class="row">
          <!-- 商品sidebar -->
          <div class="col-lg-3 col-sm-12">
            <div class="sticky-top pt-4">
              <ul class="list-group product-sidebar mb-3 text-center">
                <li
                  class="list-group-item product-sidebar-items"
                  :class="{'active': tempCategory === ''}"
                  @click="tempCategory = ''; getAllProducts() "
                >所有商品</li>
                <li
                  class="list-group-item product-sidebar-items"
                  :class="{'active': tempCategory === '競速車'}"
                  @click="tempCategory='競速車' ;getCategoryProducts('競速車')"
                >競速車</li>
                <li
                  class="list-group-item product-sidebar-items"
                  :class="{'active': tempCategory === '道具車'}"
                  @click="tempCategory='道具車';getCategoryProducts('道具車')"
                >道具車</li>
                <li
                  class="list-group-item product-sidebar-items"
                  :class="{'active': tempCategory === '角色'}"
                  @click="tempCategory='角色';getCategoryProducts('角色')"
                >角色</li>
              </ul>
            </div>
          </div>
          <!-- 商品頁面-->
          <div class="col-lg-9 col-sm-12">
            <loading :active.sync="isloading">
              <template name="default">
                <div class="bazzi-loading"></div>
              </template>
            </loading>
            <div class="row">
              <div class="col-lg-4 mb-4" v-for="item in filterData" :key="item.id">
                <div class="card shadow-sm h-100">
                  <a class="myfavorite">
                    <i
                      class="fas fa-heart"
                      v-if="isfavored (item)"
                      @click.prevent="changeFavorite(item)"
                    ></i>
                    <i class="far fa-heart" v-else @click.prevent="changeFavorite(item)"></i>
                  </a>
                  <img
                    class="card-img-top p-2 bg-dark"
                    :src="`${item.imageUrl}`"
                    :alt="`${item.title}`"
                  />

                  <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">{{item.title}}</h5>
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-column">
                        <p v-if="item.price === item.origin_price">售價{{item.origin_price}}元</p>
                        <del
                          class="mr-1"
                          v-if="item.price !== item.origin_price"
                        >原價{{item.origin_price}}元</del>
                        <p
                          class="m-0 text-danger"
                          v-if="item.price !== item.origin_price"
                        >售價{{item.price}} 元</p>
                      </div>
                      <div class="d-flex align-items-end">
                        <span class="btn btn-sm btn-primary mr-2" @click="getProduct(item.id)">
                          <i class="fas fa-info-circle"></i>
                        </span>
                        <span class="btn btn-sm btn-warning" @click="addCart(item.id,1)">
                          <i class="fas fa-shopping-cart"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--pagination  -->
            <Pagination :pagination="pagination" @getpage="getAllProducts" v-if="tempCategory===''"></Pagination>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>

import NavBar from '@/components/customer/NavBar'
import Footer from '@/components/customer/Footer'
import Pagination from '@/components/common/Pagination'
import Alert from '@/components/common/AlertMessage'

export default {
  name: 'Shop',
  components: {
    NavBar,
    Footer,
    Pagination,
    Alert

  },
  data () {
    return {
      products: [],
      product: {
        num: 1
      },
      cartContents: {},
      tempCategory: '',
      isloading: false,
      pagination: [],
      favorites: []

    }
  },
  methods: {
    getAllProducts (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.products = res.data.products
        vm.isloading = false
        vm.pagination = res.data.pagination
      })
    },
    getCategoryProducts (category) {
      const vm = this
      vm.tempCategory = category
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.products = res.data.products
        if (vm.tempCategory) {
          vm.products.filter(item => item.category === vm.tempCategory)
        }
        vm.isloading = false
      })
    },
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$http.get(url).then((res) => {
        vm.product = res.data.product
        // 回傳內容沒有數量 num，所以要加入預設值
        vm.$set(vm.product, 'num', 1)
        vm.$router.push(`/product/${id}`)
      })
    },
    // 新增至購物車
    addCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/`
      vm.isloading = true
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        if (res.data.success) {
          this.$bus.$emit('message:push', '已增加至購物車', 'success')
          this.$bus.$emit('updateCart')
        } else {
          this.$bus.$emit('message:push', '增加至購物車失敗', 'danger')
        }
        vm.isloading = false
      })
    },
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.cartContents = res.data.data
        vm.loadingItem = ''
        vm.isloading = false
      })
    },
    getFavorites () {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    },
    changeFavorite (product) {
      const vm = this

      // 儲存有在this.favorites中資料的index
      if (vm.favorites.length === 0 || vm.favorites.every(item => item.id !== product.id)) {
        vm.favorites.push(product)
      } else {
        // 存在則移除
        const index = vm.favorites.findIndex(item => item.id === product.id)
        vm.favorites.splice(index, 1)
      }
      // 儲存至 localStorage
      localStorage.setItem('favorites', JSON.stringify(vm.favorites))
      // 重新整理
      vm.getFavorites()
      vm.$bus.$emit('favor:get')
    },
    // 判斷顯示/隱藏關注樣式
    isfavored (item) {
      const isfavored = this.favorites.filter(favor => favor.id === item.id)
      if (isfavored.length > 0) {
        return true
      }
      return false
    }
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.tempCategory === '') {
        return vm.products
      } else {
        return vm.products.filter(item => item.category === vm.tempCategory)
      }
    }
  },
  created () {
    const vm = this
    vm.getAllProducts()
    vm.getCart()
    vm.getFavorites()
    vm.$bus.$on('productFavor:get', () => vm.getFavorites())
    vm.$bus.$on('message:category', (item) => vm.getCategoryProducts(item))
  },
  beforeDestroy () {
    const vm = this
    vm.$bus.$off('productFavor:get')
    vm.$bus.$off('message:category')
  }
}

</script>

<style lang="scss" scoped>
  .container {
    margin-top: 20px;
  }
  .sticky-top {
    z-index: 0;
  }
  .product-sidebar {
    border: none;
    &-items {
      text-decoration: none;
      border: 0.5px solid rgb(65, 135, 235);
      border-radius: 10px;
      margin-bottom: 10px;
      transition: all 0.3s;
      &:hover {
        background-color: rgb(65, 135, 235);
        color: #fff;
        transform: scale(0.98);
        &.active {
          border: 2px rgb(65, 135, 235);
          background-color: rgb(65, 135, 235);
          color: #fff;
        }
      }
    }
  }

  .background {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    background: url("~@/assets/img/product-img.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    .text {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 7px;
    }
  }

  .card {
    transition: all 0.3s;
    &:hover {
      transform: translate(3px, -3px);
    }
  }
  .myfavorite {
    position: absolute;
    top: 8px;
    left: 10px;
  }
  .myfavorite i {
    font-size: 26px;
    color: #ff693b;
  }
</style>
