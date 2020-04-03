<template>
  <div id="app" class="container-fluid p-0">
    <loading :active.sync="isLoading"></loading>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      isLoading: true
    }
  },
  created () {
    this.isLoading = false
  }
}
</script>

<style lang="scss">
  @import "./assets/all.scss";
</style>
