<template>
  <div class="bg-primary">
    <nav class="navbar navbar-expand-lg container">
      <div class="navbar-header d-flex">
        <router-link class="pt-1" to="/">
          <img class="navbar-brand-img" src="@/assets/img/kart-logo.png" alt="kart-rider-logo" />
        </router-link>
        <div class="navbar-icons">
          <ul class="navbar-nav d-flex flex-row">
            <!--下拉按鈕 -->
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
            <!-- 我的最愛 -->
            <li class="nav-item nav-link mr-3">
              <i
                class="fas fa-heart nav-icon"
                id="dropdownFavorButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              <span class="badge badge-danger" v-if="favorites">{{favorites.length}}</span>
              <div
                class="dropdown-menu dropdown-menu-right mr-1"
                aria-labelledby="dropdownFavorButton"
                style="width: 300px "
                v-if="favorites.length > 0"
              >
                <h5 class="text-center">我的最愛</h5>
                <table class="table">
                  <tbody>
                    <tr v-for="(item) in favorites" :key="item.id">
                      <td
                        class="text-center w-75 font-weight-bold"
                        @click="$router.push(`/product/${item.id}`)"
                      >{{ item.title }}</td>
                      <td class="pr-0">
                        <button
                          type="button"
                          class="btn btn-sm btn-warning"
                          @click="addCart(item.id)"
                        >
                          <i class="fas fa-shopping-cart"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                          @click="removeFavorItem (item.id)"
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <!-- 購物車 -->
            <li class="nav-item nav-link mr-2">
              <i
                class="fas fa-cart-arrow-down nav-icon"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="getCart"
              ></i>
              <!-- cart-badge -->
              <span class="badge badge-danger" v-if="carts.carts">{{carts.carts.length}}</span>
              <!-- cart-dropdown -->
              <div
                class="dropdown-menu dropdown-menu-right mr-1"
                aria-labelledby="dropdownMenuButton"
                style="width: 300px "
              >
                <h5 class="text-center">購物車內容</h5>
                <table class="table" v-if="carts.carts && carts.carts.length > 0">
                  <tbody>
                    <tr v-for="(item) in carts.carts" :key="item.id">
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
                      <td v-if="carts.total">{{carts.total}}</td>
                    </tr>

                    <tr class="text-success" v-if="carts.final_total!== carts.total">
                      <td class="text-right" colspan="3">折扣價</td>
                      <td>{{carts.final_total}}</td>
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
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    addCart (id, qty = 1) {
      this.$store.dispatch('addCart', { id, qty })
    },
    removeCartItem (id) {
      this.$store.dispatch('removeCartItem', id)
    },
    getFavorites () {
      this.$store.dispatch('getFavorites')
    },
    // 移除喜歡的商品
    removeFavorItem (product) {
      this.$store.dispatch('removeFavorItem', product)
    }
  },
  computed: {
    favorites () {
      return this.$store.state.favorites
    },
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.getCart()
    this.getFavorites()
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
  .nav-item {
    position: relative;
  }
  .badge {
    position: absolute;
    top: 3px;
    right: -0.6em;
    background-color: red;
    width: 1rem;
    height: 1rem;
    font-size: 10px;
    border-radius: 50px;
    color: #fff;
  }
</style>
