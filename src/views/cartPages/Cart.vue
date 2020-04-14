<template>
  <div>
    <loading :active.sync="isloading">
      <template name="default">
        <div class="bazzi-loading"></div>
      </template>
    </loading>
    <div class="container py-3">
      <div class="row">
        <div class="col-lg-6 col-md-12 mb-5">
          <h3 class="text-center">購物車資訊</h3>
          <div class="cart-details mb-3">
            <table class="table">
              <thead>
                <tr>
                  <th style="width: 100px">刪除</th>
                  <th style="width: 400px">名稱</th>
                  <th style="width: 400px">數量</th>
                  <th>總價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in cartContent.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      @click="removeCartItem (item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td>
                    {{item.product.title}}
                    <div class="text-success" v-if="item.coupon">以套用優惠券</div>
                  </td>
                  <td>{{item.qty}}</td>
                  <td>{{item.total | currency}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">總計</td>
                  <td>{{cartContent.total}}</td>
                </tr>
                <tr class="text-success" v-if="cartContent.final_total !== cartContent.total">
                  <td colspan="3" class="text-right">折扣價</td>
                  <td>{{cartContent.final_total}}</td>
                </tr>
              </tfoot>
            </table>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="輸入『跑跑開幕慶』享九折優惠"
                aria-label="Recipient's username"
                aria-describedby="button-addon"
                v-model="coupon_code"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-primary"
                  type="button"
                  id="button-addon"
                  @click="addCouponCode()"
                >套用優惠碼</button>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <!-- 訂單 -->
        <div class="col-lg-6 col-md-12">
          <h3 class="text-center">聯絡人資訊</h3>
          <form @submit.prevent="createOrder()" class="p-3">
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
                style="height: 150px"
              ></textarea>
            </div>
            <div class="text-right">
              <router-link to="/shop" class="btn btn-primary border-dark mr-2">繼續購物</router-link>
              <button class="btn btn-primary border-dark">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isloading: false,
      loadingItem: '',
      cartContent: [],
      coupon_code: '',
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
              this.$bus.$emit('message:push', res.data.message, 'success')
            }
            vm.isloading = false
          })
        }
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
<style lang="scss" scoped>
  .cart-details {
    box-sizing: border-box;
    font-size: 1rem;
    padding: 0 20px;
  }
  h3 {
    border: 2px solid #4187eb;
    margin: 0;
    line-height: 50px;
  }
</style>
