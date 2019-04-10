<template>
  <d-container fluid>
    <d-row>
        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <slot />

        <!-- Main Footer -->
        <main-footer />
    </d-row>
  </d-container>
</template>

<script>
// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
import graphqlFunction from '~/src/graphqlFunction';
import basicFunction from '~/src/basicFunction';
import address from '~/src/address';

export default {
  name: 'analytics',
  components: {
    MainNavbar,
    MainFooter,
  },
  data() {
    return {
    };
  }
};
</script>

