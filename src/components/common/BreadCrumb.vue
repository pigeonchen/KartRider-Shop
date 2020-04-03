<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          class="breadcrumb-item"
          aria-current="page"
          v-for="(item,index) in breadcrumbList"
          :key="index"
        >
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      breadcrumbList: []
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    isHome (route) {
      return route.name === 'Home'
    },
    getBreadcrumb () {
      const name = this.$route.meta.title
      const path = this.$route.path
      console.log(this.$route)
      if (!this.isHome(name)) {
        this.breadcrumbList.push({ name: '首頁', path: '/' })
        this.breadcrumbList.push({ name: name, path: path })
      }
      console.log(this.breadcrumbList)
    }
  },
  created () {
    this.getBreadcrumb()
  }
}

</script>
