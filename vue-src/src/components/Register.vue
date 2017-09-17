<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <panel title="Register">
        <form @submit.prevent="onSubmit">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            
              <v-text-field
              v-model="username"
              name="username"
              label="Enter Username"
              :rules="[required]"
              required
              ></v-text-field>

              <v-text-field
              v-model="email"
              :rules="[required]"
              name="email"
              label="Enter Email"
              required
              ></v-text-field>

              <v-text-field
              v-model="password"
              :rules="[required]"
              name="password"
              label="Enter Password"
              type="password"
              required
              ></v-text-field>

              <v-text-field
              v-model="confirmPassword"
              name="confirmPassword"
              :rules="[required]"
              label="Confirm Password"
              type="password"
              required
              ></v-text-field>

              <v-btn type="submit" primary :disabled="!formIsValid">Submit</v-btn>

            </v-flex>
          </v-layout>
        </form>
        </panel>
     </v-flex>
    </v-layout>
  </div>
</template>

<script>

import AuthService from '../services/AuthService';
import store from '../store.js'


export default {
  beforeRouteEnter (to, from, next) {
    if (!store.getters.isUserLoggedIn) {
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
      confirmPassword: '',
      required: (value) => !!value || 'Required.'
    }
  },
  computed: {
    formIsValid () {
      return this.username !== '' && this.password !== '' && this.email !== '' 
             && this.password === this.confirmPassword
    }
  },
  methods: {
    async onSubmit () {
      const data = await AuthService.register({ username: this.username, email: this.email, password: this.password })
      try {
        this.handleSuccess(data);
      } catch (e) {
        this.handleRejection(e, data);
      }
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

