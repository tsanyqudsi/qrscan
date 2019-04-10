<template lang='pug'>
.home.h-100
	.container
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

<style lang='stylus' scope>
body
  background-image:url('https://source.unsplash.com/random')
  background-size:cover
.home
  background-color:rgba(255,255,255,0.7)
</style>
