<template>
  <div>
    <loading :active.sync="isLoading">
      <template name="default">
        <div class="bazzi-loading"></div>
      </template>
    </loading>
    <!-- //TODO: 商品頁面 -->
    <div class="row mt-4">
      <div class="col-md-3 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <div class="d-flex flex-column align-items-baseline">
              <div class="h5" v-if="!item.price">{{item.origin_price}}元</div>
              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addCart(item.id,num)"
            >
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- //TODO:購物車頁面 -->
    <div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>刪除</th>
            <th>產品名稱</th>
            <th>數量</th>
            <th>單價</th>
            <th>總價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in cartContent.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-danger" @click="removeCartItem (item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td>
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">以套用優惠券</div>
            </td>
            <td>{{item.qty}}</td>
            <td>{{item.product.price | currency}}</td>
            <td>{{item.total | currency}}</td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">總計</td>
            <td>{{cartContent.total}}</td>
          </tr>
          <tr class="text-success" v-if="cartContent.final_total!== cartContent.total">
            <td colspan="4" class="text-right">折扣價</td>
            <td>{{cartContent.final_total}}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="輸入優惠碼"
          aria-label="Recipient's username"
          aria-describedby="button-addon"
          v-model="coupon_code"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon"
            @click="addCouponCode()"
          >套用優惠碼</button>
        </div>
      </div>
    </div>
    <!--//TODO:送出訂單頁面 -->
    <div>
      <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="createOrder()">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control"
              :class="{'isvalid': errors.has('name')}"
              name="email"
              id="useremail"
              v-model="form.user.email"
              placeholder="請輸入 Email"
              v-validate="'required|email'"
            />
            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
          </div>

          <div class="form-group">
            <label for="username">名稱</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              v-model="form.user.name"
              placeholder="輸入姓名"
              v-validate="'required'"
            />
            <span class="text-danger" v-if="errors.has('name')">請重新填入</span>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
              data-vv-as="field"
              name="tel"
              v-validate="'numeric'"
            />
            <span class="text-danger" v-if="errors.has('tel')">請輸入數字</span>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              placeholder="請輸入地址"
              v-validate="'required'"
            />
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>

          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
    <!-- //TODO:modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productsModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="img-fluid" :src="product.imageUrl" />
            <blockquote class="blockquote mt-3">
              <p>{{product.content}}</p>
              <p>{{product.desprition}}</p>
            </blockquote>
            <div class="d-flex flex-column align-items-baseline">
              <div class="h5" v-if="!product.price">{{product.origin_price}}元</div>
              <div class="h5" v-if="product.price">價格 : {{product.price}} 元</div>
            </div>
            <select class="form-control mt-3" v-model="product.num">
              <option v-for="num in 10" :value="num" :key="num">{{num}}{{product.unit}}</option>
            </select>
          </div>

          <div class="modal-footer">
            <div class="text-muted mr-3">小計 {{product.num * product.price}} 元</div>
            <button type="button" class="btn btn-primary" @click="addCart(product.id,product.num)">
              <i class="fas fa-cart-plus" v-if="product.id === loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      products: [],
      // TODO: Modal
      product: {
      },
      isloading: false,
      loadingItem: '',
      // TODO:購物車頁面
      cartContent: [],
      coupon_code: '',
      // TODO:表單驗證
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.products = res.data.products
        vm.isloading = false
      })
    },
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.loadingItem = id
      this.$http.get(url).then((res) => {
        vm.product = res.data.product
        // 回傳內容沒有數量 num，所以要加入預設值
        vm.$set(vm.product, 'num', 1)
        $('#productModal').modal('show')
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
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        vm.loadingItem = ''
        this.getCart()
        $('#productModal').modal('hide')
      })
    },
    // 取得購物車
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.cartContent = res.data.data
        vm.loadingItem = ''
        vm.isloading = false
      })
    },
    // 刪除購物車項目
    removeCartItem (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isloading = true
      this.$http.delete(url).then((res) => {
        vm.getCart()
        vm.isloading = false
      })
    },
    addCouponCode () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isloading = true
      this.$http.post(url, { data: coupon }).then((res) => {
        vm.getCart()
        vm.isloading = false
      })
    },
    createOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(url, { data: order }).then((res) => {
            if (res.data.success) {
              vm.$router.push(`./customer_checkout/${res.data.orderId}`)
            }
            vm.isloading = false
          })
        }
      })
    }

  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
