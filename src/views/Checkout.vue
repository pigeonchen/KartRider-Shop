<template>
  <div>
    <NavBar></NavBar>
    <main>
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>

import NavBar from '@/components/customer/NavBar'
import Footer from '@/components/customer/Footer'

export default {
  name: 'checkout',
  components: {
    NavBar,
    Footer

  }
}
</script>
