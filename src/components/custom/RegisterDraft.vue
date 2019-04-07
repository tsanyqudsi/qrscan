<template>
  <d-card class="card-small h-100">

    <!-- Component Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="d-flex flex-column">
      <!-- <d-form class="quick-post-form"> -->

      <div class="form-group">
        <d-input class="form-control" v-model="input.email" placeholder="Email" />
      </div>

      <div class="form-group">
        <d-input class="form-control" v-model="input.fullname" placeholder="Full Name" />
      </div>

      <div class="form-group">
        <d-input class="form-control" type="password" v-model="input.password" placeholder="Password" />
      </div>

      <div class="form-group">
        <d-input class="form-control" type="password" v-model="input.confirm_password" placeholder="Confirm Password" />
      </div>

      <div class="form-group">
        <d-button class="btn-accent" v-on:click="register">Submit</d-button>
      </div>

      <!-- </d-form> -->
    </d-card-body>

  </d-card>
</template>

<script>
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';

export default {
  name: 'register-draft',
  props: {
    /**
       * The component's title.
       */
    title: {
      type: String,
      default: 'Register Draft',
    },
  },
  data(){
      return{
        input:{
          email: "",
          fullname: "",
          role: "",
          authority: [],
          password: "",
          confirm_password: ""
        },
        roles: [],
        plugins: []
      }
  },

  methods: {
    register() {
      if(this.input.email != "" && this.input.fullname != "" && this.input.password != "" && this.input.confirm_password != "") {
        if(this.input.password == this.input.confirm_password) {
          let postObj = {
            email: this.input.email, 
            fullname: this.input.fullname,
            role: this.input.role,
            authority: this.input.authority,
            password: this.input.password
          };
          this.axios.post(address + ':3000/register-user', postObj)
          .then((response) => {
            let query = `mutation createSingleUser($input:PersonInput) {
                createUser(input: $input) {
                    fullname
                }
            }`;
            let variables = {
              input: postObj
            }
            graphqlFunction.graphqlMutation(query, variables, (result) => {
              alert("Add User Success");
              this.$router.push('/');
            });
          });
        }
        else {
          alert("Password didn't match");
        }
      }
      else {
        alert("Field cannot be empty");
      }
    }
  }
}
</script>
