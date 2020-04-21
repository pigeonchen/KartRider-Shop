<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
      role="alert"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',

  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 100)
      this.$store.dispatch('updateMessage', { message, status, timestamp })
    },
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    },
    removeMessageWithTiming (timestamp) {
      this.$store.dispatch('removeMessageWithTiming', timestamp)
    }
  },
  computed: {
    messages () {
      return this.$store.state.messages
    }
  }
  // created () {
  //   const vm = this
  //   // 自定義名稱 'messsage:push'
  //   // message: 傳入參數
  //   // status: 樣式，預設值為 warning
  //   // 接收消息
  //   vm.$bus.$on('message:push', (message, status = 'warning') => {
  //     vm.updateMessage(message, status)
  //   })
  //   // 送出消息
  //   // vm.$bus.$emit('message:push')
  // },
  // beforeDestroy () {
  //   this.$bus.$off('message:push', this.openMessage)
  // }

}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
