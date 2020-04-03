<template>
  <div>
    <footer class="footer bg-dark">
      <div class="footer-contact">
        <a href="https://www.facebook.com/kartriderTW/" target="_blank">
          <i class="fab fa-facebook"></i>
        </a>

        <a href="https://kartinfo.me/" target="_blank">
          <img src="../../assets/img/kartinfo.png" />
        </a>
        <a href="https://twitter.com/KartRiderDrift" target="_blank">
          <i class="fab fa-twitter-square"></i>
        </a>
      </div>
      <div class="footer-copyright text-white">
        <p class="m-0">此網站為個人作品，並非商業用途</p>
        <p class="m-0">
          以上素材為
          <a href="https://tw.nexon.com/main/zh" target="_blank">
            <img src="../../assets/img/nexon.png" alt />
          </a> 所有
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style lang="scss" scoped>
  //footer 固定在在底部
  .footer {
    width: 100%;
    &-copyright {
      font-weight: 100;
      letter-spacing: 5px;
    }
  }
</style>
