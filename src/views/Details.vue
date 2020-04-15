 <template>
  <div>
    <NavBar></NavBar>
    <Alert></Alert>
    <main>
      <loading :active.sync="isloading">
        <template name="default">
          <div class="bazzi-loading"></div>
        </template>
      </loading>

      <div class="container p-0 py-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" aria-current="page">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item" aria-current="page">
              <router-link to="/shop">商城</router-link>
            </li>
            <li class="breadcrumb-item" aria-current="page">{{product.title}}</li>
          </ol>
        </nav>
        <div class="row d-flex">
          <div
            class="col-lg-5 col-sm-12 d-flex justify-content-center align-items-center bg-dark ml-3"
          >
            <img :src="product.imageUrl" :alt="product.title" />
          </div>
          <div class="info col-lg-6 col-sm-12 ml-2">
            <div class="info-title d-flex justify-content-between mb-3">
              <h1>{{ product.title }}</h1>
              <span class="ml-1 badge badge-secondary">{{product.category}}</span>
            </div>
            <div class="info-price">
              <div class="mt-3">
                <p
                  class="text-success"
                  v-if="product.price === product.origin_price"
                >售價 {{product.origin_price}} 元</p>
                <del
                  class="mr-1 text-success"
                  v-if="product.price !== product.origin_price"
                >原價{{product.origin_price}}元</del>
                <p
                  class="m-0 text-danger"
                  v-if="product.price !== product.origin_price"
                >售價{{product.price}} 元</p>
              </div>
            </div>

            <div class="info-details my-3">
              <h5>商品描述</h5>
              <div class="mb-4" v-html="description"></div>
              <h5>商品特色</h5>
              <div v-html="content"></div>
            </div>
            <div class="d-flex justify-content-between">
              <h5 class="align-middle">數量</h5>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-primary ml-2"
                  :class="{'disabled': qty <= 1}"
                  @click.prevent=" decreaseqty () "
                >-</button>
                <input type="text" class="text-center mx-1" v-model="qty" style="width: 60px;" />
                <button type="button" class="btn btn-primary" @click.prevent=" increaseqty () ">+</button>
              </div>
            </div>
            <button
              class="btn btn-primary w-100 mt-5 mb-3"
              @click.prevent="addCart(product.id,qty)"
            >加入購物車</button>
          </div>
        </div>
      </div>
      <div class="container py-5">
        <h3 class="text-center mb-5">推薦商品</h3>
        <swiper ref="mySwiper" :options="detailOptions">
          <swiper-slide v-for="item in filterProducts" :key="item.id">
            <div class="swiper-picture">
              <img class="swiper-img" :src="item.imageUrl" alt="item.title" />
              <div class="swiper-info">
                <div
                  class="swiper-info--btn btn btn-outline-primary"
                  @click.prevent="directProduct(item.id)"
                >前往商品</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
import $ from 'jquery'
import NavBar from '@/components/customer/NavBar'
import Footer from '@/components/customer/Footer'
import Alert from '@/components/common/AlertMessage'

export default {
  name: 'Shop',
  components: {
    NavBar,
    Footer,
    Alert

  },
  data () {
    return {
      products: [],
      productId: '',
      product: {
      },
      qty: 1,
      isloading: false,
      loadingItem: '',
      description: '',
      content: '',
      // swiper
      detailOptions: {
        speed: 500,
        autoplay: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  methods: {
    getAllProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.products = res.data.products
        vm.isloading = false
      })
    },
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.$route.params.id}`
      vm.loadingItem = id
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.product = res.data.product
        // 回傳內容沒有數量 num，所以要加入預設值
        vm.$set(vm.product, 'num', 1)
        vm.turnDetails()
        vm.loadingItem = ''
        vm.isloading = false
      })
    },
    directProduct (id) {
      // 因為同一個路徑會出錯
      const path = `/product/${id}`
      this.$router.push(path).catch(err => err)
      this.getProduct(id)
    },
    // 新增至購物車
    addCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/`
      vm.loadingItem = id
      const cart = {
        product_id: id,
        qty: vm.qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        vm.loadingItem = ''
        this.getCart()
        $('#productModal').modal('hide')
        if (res.data.success) {
          setTimeout(() => {
            this.$bus.$emit('message:push', '已增加至購物車', 'success')
            this.$bus.$emit('updateCart')
          }, 500)
        } else {
          setTimeout(() => {
            this.$bus.$emit('message:push', '增加至購物車失敗', 'danger')
          }, 500)
        }
      })
    },
    turnDetails () {
      const vm = this
      const { description, content } = vm.product
      vm.description = description.replace(/\n/g, '<br/>')
      vm.content = content.replace(/\n/g, '<br/>')
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
    increaseqty () {
      const vm = this
      if (vm.qty >= 0) {
        vm.qty += 1
      }
    },
    decreaseqty () {
      const vm = this
      if (vm.qty > 1) {
        vm.qty -= 1
      }
    }
  },
  computed: {
    filterProducts () {
      const vm = this
      return vm.products.filter((item) => item.category === vm.product.category && item.id !== vm.product.id)
    },
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  created () {
    this.getCart()
    this.getProduct()
    this.getAllProducts()
  }
}

</script>
<style lang="scss" scoped>
  .info {
    .badge {
      position: absolute;
      top: 5%;
      right: 5%;
      font-size: 12px;
      line-height: 20px;
    }
    &-title h1 {
      border-bottom: 3px solid #4187eb;
    }
    &-details {
      h5 {
        border-bottom: 1px solid rgb(68, 64, 64);
      }
      div {
        font-size: 0.75rem;
        color: rgb(68, 64, 64);
      }
    }
  }
  //swiper
  .swiper {
    &-picture {
      width: 100%;
      height: 100%;
      position: relative;
      padding: 2rem;
      background-color: #343a40;

      &:last-child {
        margin-right: 0;
      }
    }
    &-img {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #343a40;
    }
    &-info {
      width: 100%;
      height: 0;
      background: rgba(245, 245, 245, 0.45);
      position: absolute;
      top: 0;
      left: 0;
      transition: display 0.5s;
      &--btn {
        position: absolute;
        opacity: 0;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &-button-next {
      right: 0;
    }
    &-picture:hover {
      .swiper-info {
        height: 100%;
      }
      .swiper-info--btn {
        opacity: 1;
      }
    }
  }
  .my-button-disabled {
    opacity: 0;
  }
</style>
