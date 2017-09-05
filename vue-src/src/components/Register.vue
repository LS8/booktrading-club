<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSubmit">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            
              <v-text-field
              v-model="username"
              name="username"
              label="Enter Username"
              required
              ></v-text-field>

              <v-text-field
              v-model="email"
              name="email"
              label="Enter Email"
              required
              ></v-text-field>

              <v-text-field
              v-model="password"
              name="password"
              label="Enter Password"
              type="password"
              required
              ></v-text-field>

              <v-text-field
              v-model="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              ></v-text-field>

              <v-btn type="submit" primary :disabled="!formIsValid">Submit</v-btn>

            </v-flex>
          </v-layout>
        </form>
     </v-flex>
    </v-layout>
  </div>
</template>

<script>

import AuthService from '../services/AuthService';
import store from '../store.js'


export default {
  beforeRouteEnter (to, from, next) {
    if (!store.getters.auth) {
      next();
    } else {
      next('/home');
    }
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    formIsValid () {
      return this.username !== '' && this.password !== '' && this.email !== '' 
             && this.password === this.confirmPassword
    }
  },
  methods: {
    onSubmit () {
      AuthService.register({ username: this.username, email: this.email, password: this.password })
        .then( data => {
          try {
            this.handleSuccess(data);
          }
          catch (e) {
            this.handleRejection(e, data);
          }
        });
    },
    handleSuccess(data) {
      if (!data.success) throw new Error('Failed to register');
      this.$swal({
        title: 'Success',
        text: 'Successfully registered, you can now login',
        type: 'success',
        timer: 1000,
        showConfirmButton: false
        }).then(
          function() {},
          function (dismiss) {
            this.$router.push('login');
          }.bind(this)
          )
    },
    handleRejection(e, data) {
      if (data.status === 1) this.username = '';
      if (data.status === 2) this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.$swal({
        title: 'Error',
        text: data.msg,
        type: 'error',
        timer: 1000,
        showConfirmButton: false
      }).catch(this.$swal.noop);
    }
  }
  
}
</script>

<style>
</style>

