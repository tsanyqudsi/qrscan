<template lang="pug">
div( class="home")
	div( class="container")
		div( class="transparent")
			p( class="home-heading") THIS IS A CMS
			router-link( is="sui-button" class="home-btn" primary to="/login") Sign In
			router-link( is="sui-button" class="home-btn" color="olive" to="/register") Sign Up
</template>

<script>
export default {
  name: 'home',
  components: {
  },
};
</script>

<style>
	.home {
		max-width: 100%;
		height: 100%;
		background-image: url('../assets/images/content-management/home.png');
		background-repeat:no-repeat;
		background-size:cover;
		background-position:center;
	}

	.container {
		max-width: 100%;
		height: 250px;
	  	position: absolute;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0;
	  	
		margin: auto;
	}

	.transparent {
		background: rgba(0, 0, 0, 0.6);
		height: 100%;
		text-align: center;
	}

	.home-heading {
		font-family: "Arial Black";
		font-size: 80px;
		color: white;
	}

	.home-btn {
		width: 120px;
		font-family: "Arial Black";
		text-align: center;
	}
</style>
