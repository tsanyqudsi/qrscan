<template lang='pug'>
d-container.h-100
	d-link.btn( to="/login") Sign In
	d-link.btn( to="/register") Sign Up
</template>

<script>
export default {
  name: 'home',
  components: {
  },
};
</script>

<style lang='stylus' scoped>
.home
  background-color:rgba(255,255,255,0.7)
</style>
