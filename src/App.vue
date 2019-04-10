<template lang='pug'>
	component(is='layout')
		router-view
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
