<template lang="pug">
    d-row.h-100.align-items-center
      a-login
</template>

<script>
import Login from '@/components/custom/Login.vue';

export default {
  name: 'login',
  components: {
    aLogin: Login,
  },
};
</script>
