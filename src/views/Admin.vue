<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <div class="container-fluid h-100">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-lg-10 col-sm-12 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/admin/Sidebar'
import Navbar from '@/components/admin/Navbar'
import Alert from '@/components/common/AlertMessage'

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  }
}
</script>
