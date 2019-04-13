<template lang="pug">
    d-row.h-100(align-v='center', align-h='center')
      d-card(align='center')
        d-card-body
          d-image(src='favicon/ms-icon-70x70.png')
          h6 Welcome To {{title}}
          d-form(validated='')
          .form-group
            label(for='f2_Email') Email Address
            d-input#f2_Email.mb-2.mr-sm-2.mb-sm-0(v-model='input.email', placeholder='email@example.com', required='')
              d-form-invalid-feedback Invalid email address!
              d-form-valid-feedback Your email looks good!
              small.form-text.text-muted We'll never share your email with anyone else.
          .form-group
            label(for='f2_PasswordInput') Password
            d-form-input#f2_PasswordInput(type='password', v-model='input.password', required='', placeholder='Password')
            d-form-invalid-feedback Please provide a valid password!
          //- .form-group
            d-form-checkbox(v-model='form.tos', value='tos_agree', unchecked-value='tos_do_not_agree')
              | I agree with the 
              a(href='#') Terms of Service
          d-button(type='submit' v-on:click='login') Login
</template>

<script>
import address from '@/address';
export default {
  name: 'login',
  props: {
    /**
       * The component's title.
       */
    title: {
      type: String,
      default: 'Application',
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
            this.$router.push('/blog-overview');
            location.reload();
            this.$session.start();
            this.$session.set('user', response.data.response);
            document.cookie = "token=" + response.data.token;
            document.cookie = "user_session=" + this.$session.get('user')._id;
            document.cookie = "user_authority=" + this.$session.get('user').authority;
            localStorage.setItem('user_role', this.$session.get('user').role);
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

<style lang="stylus" scoped>
body
  background-image:url('https://source.unsplash.com/random')
  background-size:cover

h6
  padding-bottom:2rem

.btn
  border-radius : 1rem

.card 
  box-shadow: 0 -4px 0 rgba(0,0,0,0.3)

.card-body
  min-width : 300px
</style>

