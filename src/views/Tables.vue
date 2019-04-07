<template lang="pug">
  div( class="main-content-container container-fluid px-4")
    <!-- Page Header -->
    div( class="page-header row no-gutters py-4")
      div( class="col-12 col-sm-4 text-center text-sm-left mb-0")
        span( class="text-uppercase page-subtitle") Overview
        h3( class="page-title") Data Tables
    <!-- Default Light Table -->
    div( class="row")
      div( class="col")
        div( class="card card-small mb-4")
          div( class="card-header border-bottom")
            h6( class="m-0") Active Users
          div( class="card-body p-0 pb-3 text-center")
            table( class="table mb-0")
              thead( class="bg-light")
                tr
                  th( scope="col" class="border-0") Fullname
                  th( scope="col" class="border-0") Email
                  th( scope="col" class="border-0") Age
                  th( scope="col" class="border-0") Sex
                  th( scope="col" class="border-0") QR Code Result
              tbody
                tr( v-for="bio in bios")
                  td {{bio.fullname}}
                  td {{bio.email}}
                  td {{bio.age}}
                  td {{bio.sex}}
                  td {{bio.result}}
</template>
<script>
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';

export default {
  name: 'data-table',
  data(){
    return{
      bios: [],
    }
  },

  created: function()
  {
    this.fetchBio();
  },

  methods: {
    fetchBio() {
      this.axios.get(address + ':3000/get-bio')
      .then((response) => {
        this.bios = response.data;
      });
    }
  }
}
</script>
