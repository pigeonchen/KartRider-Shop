<template>
  <div class="col-lg-2 col-sm-12 d-md-block bg-light sidebar">
    <nav>
      <div class="sidebar">
        <ul class="nav flex-column">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span>管理員</span>
            <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <li class="nav-item">
            <router-link class="nav-link text-left" to="products">
              <i class="fas fa-inbox mr-2"></i>
              <span>產品列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-left" to="orders">
              <i class="fas fa-clipboard-list mr-2"></i>
              <span>檢視訂單</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-left" to="coupons">
              <i class="fas fa-receipt mr-2"></i>
              <span>編輯優惠券</span>
            </router-link>
          </li>
        </ul>
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>

        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link text-left" to="/order_imitation">
              <i class="far fa-credit-card mr-2"></i>
              <span>模擬訂單</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<style lang='scss' scoped>
  .nav-item {
    font-size: 1.3em;
    i {
      width: 25px;
      height: 25px;
      font-size: 20px;
    }
  }
</style>
