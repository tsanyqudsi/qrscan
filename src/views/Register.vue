<template lang="pug">
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <!-- New Draft -->
      <d-col lg="4" md="6" sm="12" class="mb-4">
          <bo-register-draft />
      </d-col>

      <!-- Top Referrals -->
      <d-col lg="3" md="12" sm="12" class="mb-4">
        
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import RegisterDraft from '@/components/custom/RegisterDraft.vue';

export default {
  name: 'register',
  components: {
    boRegisterDraft: RegisterDraft,
  },
};
</script>
