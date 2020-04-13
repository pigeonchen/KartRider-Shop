
<template>
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
        <swiper ref="HomeSwiper" :options="swiperOptions" class="swiper-box text-center">
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
            <p class="m-1">擁有豐富的車種及角色</p>
            <p class="m-1">每台車子都有不同性能及特色</p>
            <p class="m-1">每位角色都有不同能力加成</p>
            <p class="m-1 mb-3">快來體驗駕駛卡丁車的樂趣吧</p>
            <router-link class="btn btn-lg btn-primary mb-1" to="shop" role="button">前往商城</router-link>
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
      </div>
    </header>
    <!-- 商品種類 -->
    <main class="products container-fluid p-0">
      <h1 class="py-5 text-center">商品種類</h1>
      <div class="row">
        <div class="col-6">
          <div class="product-img"></div>
        </div>
        <div class="col-6"></div>
      </div>
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6"></div>
      </div>
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6"></div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<style scoped>
</style>
<script>
// @ is an alias to /src
import NavBar from '@/components/customer/NavBar'
import Footer from '@/components/customer/Footer'
import Alert from '@/components/common/AlertMessage'
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
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        autoplay: true
      }
    }
  },
  methods: {
    getAllProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isloading = true
      this.$http.get(url).then((res) => {
        vm.categotyProducts = res.data.products
      })
      window.setTimeout(() => {
        vm.isloading = false
      }, 1000)
    },
    copyCouponCode () {
      const vm = this
      this.$copyText(this.message).then(
        () => {
          this.$bus.$emit('message:push', '複製成功', 'success')
        },
        () => {
          vm.$bus.$emit('message:push', '複製失敗', 'danger')
        }
      )
    }
  },
  created () {
    this.getAllProducts()
  },
  computed: {
    swiper () {
      return this.$refs.HomeSwiper.$swiper
    }
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
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
      margin-bottom: 1%;
    }
  }
</style>
