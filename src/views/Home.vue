<template>
  <div>
    <NavBar />

    <header>
      <Alert></Alert>
      <!--  Carousel 輪播-->
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <!-- Carousel 背景 -->
        <div class="carousel-background">
          <video class="carousel-background__content" autoplay muted loop>
            <source src="../assets/img/kartrider.mp4" type="video/mp4" />
            <source src="../assets/img/kartrider.webm" type="video/webm" />your browser is not support!!
          </video>
        </div>
        <!-- Carousel 選項 -->
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active">
            <i class="fas fa-circle"></i>
          </li>
          <li data-target="#myCarousel" data-slide-to="1">
            <i class="fas fa-circle"></i>
          </li>
        </ol>
        <!-- Carousel 內容 -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="carousel-content">
              <h1>歡慶開幕</h1>
              <p class="mt-3">即日起只要輸入指定優惠碼</p>
              <p>
                即享有
                <span class="h2 text-danger">8</span> 折優惠
              </p>
              <div style="max-width: 250px" class="input-group mx-auto mb-3">
                <span class="form-control">{{message}}</span>
                <button type="button" class="btn btn-primary" @click="copyCouponCode">
                  <i class="far fa-clone"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="carousel-content">
              <h1>關於跑跑卡丁車</h1>
              <p>是韓國NEXON公司出品的一個休閒類賽車競速遊戲，亦是爆爆王的衍生遊戲...</p>
              <p>
                <router-link class="btn btn-lg btn-primary" to="about" role="button">了解更多</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- main -->
    <main class="products container-fluid p-0">
      <!-- 競速車 -->
      <div class="products-items row no-gutters">
        <div class="col-lg-6 col-12">
          <img class="products-items-img" src="../assets/img/Ranger.png" alt="Ranger" />
        </div>
        <div class="col-lg-6 col12">
          <div class="products-items-content text-center">
            <h1>競速車</h1>
            <p>擁有強大的推進器，可以快速甩開對手</p>
          </div>
        </div>
      </div>
      <!--道具車  -->
      <div class="products-items row d-flex flex-row-reverse no-gutters">
        <div class="col-lg-6 col-sm-12">
          <img class="products-items-img" src="../assets/img/Broom.png" alt="Broom" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="products-items-content text-center">
            <h1>道具車</h1>
            <p>每台道具車都有屬於自己特別的道具</p>
          </div>
        </div>
      </div>
      <!-- 角色 -->
      <div class="products-items row no-gutters">
        <div class="col-lg-6 col-sm-12">
          <img class="products-items-img" src="../assets/img/Bazzi.png" alt="Bazzi" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="products-items-content text-center">
            <h1>角色</h1>
            <p>多樣角色任你挑選</p>
          </div>
        </div>
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
      message: '跑跑開幕慶'
    }
  },
  methods: {
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
  }
}
</script>
