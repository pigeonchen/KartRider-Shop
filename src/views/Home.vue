
<template >
  <div>
    <loading :active.sync="isloading">
      <template name="default">
        <div class="bazzi-loading"></div>
      </template>
    </loading>
    <NavBar />
    <header>
      <Alert></Alert>
      <!-- 輪播 -->
      <div class="swiper container-fluid p-0">
        <div class="swiper-background">
          <video class="swiper-background__video" autoplay muted loop>
            <source src="../assets/img/kartrider.mp4" type="video/mp4" />
            <source src="../assets/img/kartrider.webm" type="video/webm" />
          </video>
        </div>
        <swiper ref="HeaderSwiper" :options="headerOptions" class="swiper-box text-center">
          <swiper-slide class="swiper-items">
            <h1>關於跑跑</h1>
            <p class="m-1">是韓國NEXON公司出品的一個休閒類賽車競速遊戲</p>
            <p class="m-1">亦是爆爆王的衍生遊戲</p>
            <p class="m-1 mb-4">於2007年1月3日於台灣公測</p>
            <router-link class="btn btn-lg btn-primary" to="about" role="button">了解更多</router-link>
          </swiper-slide>
          <swiper-slide class="swiper-items">
            <h1>歡慶開幕</h1>
            <p class="mt-3">即日起只要輸入指定優惠碼</p>
            <p class="m-1 mb-4">
              即享有
              <span class="h2 text-danger">9</span> 折優惠
            </p>
            <div style="max-width: 250px" class="input-group mx-auto mb-3">
              <span class="form-control">{{message}}</span>
              <button type="button" class="btn btn-primary" @click="copyCouponCode">
                <i class="far fa-clone"></i>
              </button>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-items">
            <h1>商城</h1>
            <p class="mb-1">擁有豐富的車種及角色</p>
            <p class="mb-1">每台車子都有不同性能及特色</p>
            <p class="mb-1">每位角色都有不同能力加成</p>
            <p class="mb-2">快來體驗駕駛卡丁車的樂趣吧</p>
            <router-link class="btn btn-lg btn-primary mb-1" to="shop" role="button">前往商城</router-link>
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
      </div>
    </header>

    <main class="container-fluid p-0">
      <!-- 商品種類 -->
      <section class="products pb-5">
        <h1 class="m-title">商品種類</h1>
        <div class="container p-0">
          <div class="row no-gutters">
            <div class="col-lg-6 col-sm-12 d-flex justify-content-center">
              <img src="@/assets/img/Ranger.png" alt="ranger" class="products-img" />
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="products-content text-center">
                <h1 class="mb-3">競速車</h1>
                <p>擁有強大推進器</p>
                <p>強勁的尾加速器</p>
                <p>兇猛的起步推進器</p>
                <a
                  class="btn btn-lg btn-primary text-white mt-4"
                  @click.prevent="toShop('競速車')"
                  role="button"
                >去看看</a>
              </div>
            </div>
          </div>
          <div class="row no-gutters d-flex flex-sm-row flex-lg-row-reverse">
            <div class="col-lg-6 col-sm-12 d-flex justify-content-center">
              <img src="@/assets/img/Broom.png" alt="ranger" class="products-img" />
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="products-content text-center">
                <h1 class="mb-3">道具車</h1>
                <p>各種稀奇古怪的外型</p>
                <p>豐富多樣的道具</p>
                <p>專屬於道具賽的推進器</p>
                <a
                  class="btn btn-lg btn-primary text-white mt-4"
                  @click.prevent="toShop('道具車')"
                  role="button"
                >去看看</a>
              </div>
            </div>
          </div>
          <div class="row no-gutters">
            <div class="col-lg-6 col-sm-12 d-flex justify-content-center">
              <img src="@/assets/img/Bazzi.png" alt="ranger" class="products-img" />
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="products-content text-center">
                <h1 class="mb-3">角色</h1>
                <p>爆爆王的原生角色</p>
                <p>個性鮮明的主題角色</p>
                <p>比賽專屬獎勵加成</p>
                <a
                  class="btn btn-lg btn-primary text-white mt-4"
                  @click.prevent="toShop('角色')"
                  role="button"
                >去看看</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 推薦商品 -->
      <section class="recommend-products pb-5">
        <h1 class="m-title">推薦商品</h1>
        <div class="container">
          <div class="row no-gutters justify-content-center">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{'active': category === '競速車'}"
                @click="category='競速車';getAllProducts() "
              >競速車</button>
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{'active': category === '道具車'}"
                @click="category='道具車';getAllProducts()"
              >道具車</button>
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{'active': category === '角色'}"
                @click="category='角色';getAllProducts()"
              >角色</button>
            </div>
            <swiper class="swiper my-3" :options="recommendOptions">
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
        </div>
      </section>
      <!-- 訂閱 -->
      <section class="contact text-center">
        <h1 class="m-title">訂閱我們</h1>
        <h3>以獲得最新內容及優惠!</h3>
        <div class="input-group mx-auto mt-5">
          <span class="fas fa-envelope btn btn-primary"></span>
          <input
            id="email"
            type="email"
            class="form-control"
            name="email"
            placeholder="輸入信箱"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            :class="{'isvalid': errors.has('name')}"
            v-model="email"
            v-validate="'required|email'"
          />
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              :disabled="errors.has('email') || email === ''"
              type="button"
              id="button-addon2"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <p class="text-danger" v-if="errors.has('email')">
          <i class="fas fa-exclamation-triangle"></i>
          {{errors.first('email')}}
        </p>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="exampleModalLabel">已送出信箱</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-center">
                <h3>感謝您的訂閱</h3>
                <h3>若有最新消息會立即通知!</h3>
                <img src="../assets/img/bazzi.gif" alt="BazziSub" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/customer/NavBar'
import Footer from '@/components/customer/Footer'
import Alert from '@/components/common/AlertMessage'

// import $ from 'jquery'
export default {
  name: 'Home',
  components: {
    NavBar,
    Footer,
    Alert
  },
  data () {
    return {
      message: '跑跑開幕慶',
      isloading: false,
      products: [],
      category: '競速車',
      email: '',
      // headerSwiper
      headerOptions: {
        speed: 500,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }

      },
      // recommmendSwiper
      recommendOptions: {
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
            slidesPerView: 3,
            spaceBetween: 30
          }
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
    copyCouponCode () {
      const vm = this
      this.$copyText(this.message).then(
        function () {
          setTimeout(() => {
            vm.$bus.$emit('message:push', '複製成功', 'success')
          }, 500)
        },
        function () {
          setTimeout(() => {
            vm.$bus.$emit('message:push', '複製失敗', 'danger')
          }, 500)
        }
      )
    },
    directProduct (id) {
      const path = `/product/${id}`
      this.$router.push(path).catch(err => err)
      this.getProduct(id)
    },
    toShop (category) {
      setTimeout(() => {
        // 若沒設延時emmit就馬上執行，$on還沒created，就會導致無法接收
        this.$bus.$emit('message:category', category)
      }, 500)
      this.$router.push('/shop')
    },
    onScroll () {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      console.log(scrollTop)
    }

  },
  computed: {
    swiper () {
      return this.$refs.HeaderSwiper.$swiper
    },
    filterProducts () {
      const vm = this
      return vm.products.filter(item => item.category === vm.category)
    }

  },
  created () {
    this.getAllProducts()
    window.addEventListener('scroll', this.onScroll)
  },
  mounted () {
    this.swiper.slideTo(3, 1000, false)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  }

}
</script>
<style lang="scss" >
  .swiper-pagination {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    .swiper-pagination-bullet {
      margin: 0 10px;
    }
  }
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
