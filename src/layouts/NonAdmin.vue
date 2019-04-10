<template lang='pug'>
  d-container(fluid)
    d-row
      main-sidebar.d-lg-none(:items="sidebarItems")
      d-col(class="main-content p-0" tag="main")
        main-navbar
        slot
        main-footer.fixed-bottom
</template>

<script>
import getSidebarItems from '@/data/sidebar-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';
import graphqlFunction from '~/src/graphqlFunction';
import basicFunction from '~/src/basicFunction';
import address from '~/src/address';

export default {
  name: 'analytics',
  components: {
    MainNavbar,
    MainSidebar,
    MainFooter,
  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  }
};
</script>

