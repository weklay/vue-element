<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.app.serviceLoading
    }
  }
}
</script>

<style lang="scss">
</style>
