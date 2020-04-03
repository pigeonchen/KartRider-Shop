 <template>
  <div>
    <NavBar></NavBar>
    <Alert></Alert>
    <main>
      <breadcrumb></breadcrumb>
      <div class="container py-5">
        <div class="row d-flex">
          <div class="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center bg-dark">
            <img class="w-100" :src="product.imageUrl" :alt="product.title" />
          </div>
          <div class="info col-lg-5 col-sm-12 ml-2 p-3">
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

            <div class="info-details mb-3">
              <h5>商品描述</h5>
              <div class="mb-1" v-html="description"></div>
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
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
import $ from 'jquery'
import NavBar from '@/components/customer/NavBar'
import Footer from '@/components/customer/Footer'
import Alert from '@/components/common/AlertMessage'
import breadcrumb from '@/components/common/BreadCrumb'
export default {
  name: 'Shop',
  components: {
    NavBar,
    Footer,
    Alert,
    breadcrumb
  },
  data () {
    return {
      productId: '',
      product: {
      },
      qty: 1,
      isloading: false,
      loadingItem: '',
      description: '',
      content: ''
    }
  },
  methods: {
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`
      vm.loadingItem = id
      this.$http.get(url).then((res) => {
        vm.product = res.data.product
        // 回傳內容沒有數量 num，所以要加入預設值
        vm.$set(vm.product, 'num', 1)
        vm.turnDetails()
        console.log(res)
        vm.loadingItem = ''
      })
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
          this.$bus.$emit('message:push', '已增加至購物車', 'success')
          this.$bus.$emit('updateCart')
        } else {
          this.$bus.$emit('message:push', '增加至購物車失敗', 'danger')
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
      if (vm.tempCategory === '') {
        return vm.products
      } else {
        return vm.categotyProducts.filter(item => item.category === vm.tempCategory)
      }
    }
  },
  created () {
    this.productId = this.$route.params.id
    this.getCart()
    this.getProduct()
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
</style>
