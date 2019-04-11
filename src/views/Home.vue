<template lang='pug'>
d-container.vh-100.p-0(fluid)
  img(src="@/assets/images/logo.svg")
  span ACMS
</template>

<script>
export default {
  name: 'home',
  components: {
  },
};
</script>

<style lang='stylus' scoped>
.container-fluid
  img
    max-width : 7rem
  span
    font-size : 7rem
</style>
