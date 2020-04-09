<template>
  <div class="swiper">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in productsList" :key="item.id">
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
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'carrousel',
  props: ['productsList'],
  data () {
    return {
      swiperOptions: {
        autoplay: 3000,
        slidesPerView: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      products: []
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    directProduct (id) {
      this.$emit('directProduct', id)
    }
  }
}
</script>
<style lang="scss" scoped>
  .swiper {
    &-img {
      margin: 0 10px;
      height: 200px;
      position: relative;
      background-color: #343a40;
    }
    &-info {
      width: 100%;
      height: 0;
      margin: 0 10px;
      background: rgba(245, 245, 245, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      transition: display 0.5s;
      &--btn {
        position: absolute;
        opacity: 0;
        top: 40%;
        left: 30%;
      }
    }
    &-picture:hover {
      .swiper-info {
        height: 200px;
      }
      .swiper-info--btn {
        opacity: 1;
      }
    }
  }
</style>
