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
        <d-input class="form-control" type="password" v-model="input.password" placeholder="Password" />
      </div>

      <div class="form-group">
        <d-button class="btn-accent" v-on:click="login">Submit</d-button>
      </div>

      <!-- </d-form> -->
    </d-card-body>

  </d-card>
</template>

<script>
import address from '@/address';
export default {
  name: 'login-draft',
  props: {
    /**
       * The component's title.
       */
    title: {
      type: String,
      default: 'Login Draft',
    },
  },
  data(){
      return {
        input: {
          email: "",
          password: ""
        }
      }
  },

  methods: {
    login() {
      if(this.input.email != "" && this.input.password != "") {
        this.axios.post(address + ':3000/login-user', {
          email: this.input.email, 
          password: this.input.password
        })
        .then((response) => {
          console.log(response.data);
          if(response.data.token) {
            alert("Login Success");
            this.$router.push('/tables');
            location.reload();
            this.$session.start();
            this.$session.set('user', response.data.response);
            document.cookie = "token=" + response.data.token;
            document.cookie = "user_session=" + this.$session.get('user')._id;
            document.cookie = "user_authority=" + this.$session.get('user').authority;
          }
          else {
            alert("Incorrect Credential");
          }
        });
      }
      else {
        alert("Email and password cannot be empty");
      }
    }
  }
};
</script>
