<template>
  <div class="sticky-top pt-4">
    <ul class="list-group product-sidebar mb-3">
      <li class="list-group-item product-sidebar-title">商品</li>
      <li class="list-group-item product-sidebar-items">競速車</li>
      <li class="list-group-item product-sidebar-items">道具車</li>
      <li class="list-group-item product-sidebar-items">角色</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SideBar'
}
</script>
<style lang="scss" scoped>
  .sticky-top {
    z-index: 0;
  }
  .product-sidebar {
    border: none;
    &-title {
      background-color: rgba(65, 135, 235, 0.8);
      color: #fff;
      border: none;
    }
    &-items {
      text-decoration: none;
      border-bottom: 0.5px solid rgba(65, 135, 235, 0.8);
    }
  }
  .active {
    color: rgba(65, 135, 235, 0.8);
  }
</style>
