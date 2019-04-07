<template>
  <component v-if="route != 'home' && route != 'login' && route != 'register'" :is="layout">
    <router-view/>
  </component>
  <router-view v-else/>
</template>

<script>
export default {
	data(){
  		return{
    		route: "",
      	}
	},
	computed: {
		layout() {
			this.route = this.$route.name;
		  	return `${this.$route.meta.layout || 'default'}-layout`;
		},
	},
};
</script>
