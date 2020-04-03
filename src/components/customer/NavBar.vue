<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="navbar-header d-flex">
        <router-link class="pt-1" to="/">
          <img class="navbar-brand-img" src="@/assets/img/kart-logo.png" alt="kart-rider-logo" />
        </router-link>
        <div class="navbar-icons">
          <ul class="navbar-nav d-flex flex-row">
            <!--hambager -->
            <li class="nav-item mr-3">
              <a
                class="navbar-toggler nav-link"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="fas fa-bars"></i>
              </a>
            </li>
            <!-- 使用者 -->
            <li class="nav-item mr-3">
              <router-link class="nav-link" to="/login">
                <i class="fas fa-user"></i>
              </router-link>
            </li>
            <!-- 購物車 -->
            <li class="nav-item nav-link mr-3">
              <i
                class="fas fa-cart-arrow-down"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="getCart"
              ></i>
              <!-- cart-badge -->
              <span
                class="badge badge-pill badge-danger"
                v-if="cartContents.carts"
              >{{cartContents.carts.length}}</span>
              <!-- cart-dropdown -->
              <div
                class="dropdown-menu dropdown-menu-right mr-1"
                aria-labelledby="dropdownMenuButton"
                style="width: 300px "
              >
                <h5 class="text-center">購物車內容</h5>
                <table class="table" v-if="cartContents.carts && cartContents.carts.length > 0">
                  <tbody>
                    <tr v-for="(item) in cartContents.carts" :key="item.id">
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger"
                          @click="removeCartItem (item.id)"
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>{{item.product.title}}</td>
                      <td>{{item.qty}}</td>
                      <td>{{item.total | currency}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td class="text-right" colspan="3">總計</td>
                      <td v-if="cartContents.total">{{cartContents.total}}</td>
                    </tr>

                    <tr class="text-success" v-if="cartContents.final_total!== cartContents.total">
                      <td class="text-right" colspan="3">折扣價</td>
                      <td>{{cartContents.final_total}}</td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <router-link class="btn btn-md btn-primary w-100" to="/checkout/cart">前往購物車</router-link>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <p class="text-center" v-else>無商品</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-3">
          <li class="nav-item mr-3">
            <router-link class="nav-link" to="/about">關於</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/shop">商城</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'Navbar',
  data () {
    return {
      cartContents: []
    }
  },
  methods: {
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.cartContents = res.data.data
        vm.loadingItem = ''
        vm.isloading = false
      })
    },
    removeCartItem (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isloading = true
      this.$http.delete(url).then((res) => {
        vm.getCart()
        vm.isloading = false
      })
    }
  },
  created () {
    const vm = this
    vm.getCart()
  },
  mounted () {
    this.$bus.$on('updateCart', this.getCart)
  },
  beforeDestroy () {
    this.$bus.$off('updateCart')
  }
}
</script>
<style lang="scss" scoped>
  .nav-link {
    transition: all 0.4s;
    &:hover,
    &:active,
    &:focus {
      color: #ffc327;
    }
  }
  .dropdown-menu {
    position: absolute;
    top: 115%;
    z-index: 2;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
  }
  #dropdownMenuButton {
    position: relative;
  }
  .badge {
    position: relative;
    top: -50%;
    right: 12%;
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 12px;
  }
</style>
