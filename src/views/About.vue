<template>
  <div>
    <NavBar></NavBar>
    <main>
      <div class="container p-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item" aria-current="page">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">關於</li>
          </ol>
        </nav>

        <div class="about-info row no-gutters p-3">
          <img src="../assets/img/about-race.png" class="col-lg-6 col-md-12" />
          <div class="info-content col-lg-6 col-md-12 p-3">
            <h3>遊戲模式</h3>
            <p>
              遊戲模式分為競速賽及道具賽，這兩種模式又可以選擇個人賽或團體賽，之後陸續增加GP賽，激鬥模式，劇場模式等等，擁有多種豐富模式等著你來玩
              !!
            </p>
          </div>
        </div>
        <div class="about-info row no-gutters mt-5 p-3">
          <img src="../assets/img/about-characters.png" class="col-lg-6 col-md-12" />
          <div class="info-content col-lg-6 col-md-12 p-3">
            <h3>遊戲角色</h3>
            <p>遊戲由「爆爆王」做延伸的賽車遊戲，所以初始角色為「爆爆王」角色，而之後因應各種主提，製作出更多豐富的角色。</p>
          </div>
        </div>
        <div class="about-info row no-gutters mt-5 p-3">
          <img src="../assets/img/about-tracks.png" class="col-lg-6 col-md-12" />
          <div class="info-content col-lg-6 col-md-12 p-3">
            <h3>遊戲地圖</h3>
            <p>遊戲地圖有高達28種不同主題，從炎熱的沙漠到寒冷的冰河，從侏儸紀到現代世界，而且之後還有陸續推出各種主題，絕對不會讓你無聊!!</p>
          </div>
        </div>
        <div class="about-info row no-gutters my-5 p-3">
          <img src="../assets/img/about-generation.png" class="col-lg-6 col-md-12" />
          <div class="info-content col-lg-6 col-md-12 p-3">
            <h3>車輛演進</h3>
            <p>車輛隨著時間的變化，不斷進步，從初始車系 C1 到現在的第十世代 X車系，不只外型更加有型，功能及速度上有著非常大的進步</p>
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

export default {
  name: 'About',
  components: {
    NavBar,
    Footer

  }
}
</script>
<style lang="scss" scoped>
  .about-info {
    border: 2px solid black;
    border-radius: 5px;
    min-height: 300px;
    background-image: linear-gradient(
      to right,
      rgba(255, 229, 2, 0.2),
      rgba(255, 229, 2, 0.8)
    );
  }
</style>
