<template lang="pug">
    d-row.h-100(align-v='center', align-h='center')
      d-card(align='center')
        d-card-body
          d-image(src='favicon/ms-icon-70x70.png')
          h6 Welcome To {{title}}
          d-form(validated='')
          .form-group
            label(for='Email') Please enter your Email address
            d-input#f2_Email.mb-2.mr-sm-2.mb-sm-0(v-model='input.email', placeholder='email@example.com', required='')
              d-form-invalid-feedback Invalid email address!
              d-form-valid-feedback Your email looks good!
              small.form-text.text-muted We'll never share your email with anyone else.
          .form-group
            label(for='FullName') Please enter your Full Name
            d-form-input#f2_FullName(v-model='input.fullname', required='', placeholder='John Dope')
          .form-group
            label(for='Role') Please enter your desired role
            d-form-radio#f1_Role(v-model='input.role' value='admin') Admin
            d-form-radio#f2_Role(v-model='input.role' value='user') User
          .form-group
            label(for='PasswordInput') Please enter your desired password
            d-form-input#f2_PasswordInput(type='password', v-model='input.password', required='', placeholder='Password')
            d-form-invalid-feedback Please provide a valid password!
          .form-group
            label(for='ConfirmPasswordInput') Confirm your password
            d-form-input#f2_ConfirmPasswordInput(type='password', v-model='input.confirm_password', required='', placeholder='Confirm Password')
            d-form-invalid-feedback Please provide a valid password!
          //- .form-group
            d-form-checkbox(v-model='form.tos', value='tos_agree', unchecked-value='tos_do_not_agree')
              | I agree with the 
              a(href='#') Terms of Service
          d-button(v-on:click="register") Register
</template>

<script>
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';

export default {
  name: 'register',
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

<style lang="stylus" scoped>
label
  font-size: 0.8rem

h6
  padding-bottom:2rem

.form-group
  text-align: left

.card-body
  min-width : 300px

.card 
  box-shadow: 0 -4px 0 rgba(0,0,0,0.3)
</style>
