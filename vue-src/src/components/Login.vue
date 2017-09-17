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
              v-model="password"
              name="password"
              label="Enter Password"
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
      password: ''
    }
  },
  computed: {
    formIsValid () {
      return this.username !== '' && this.password !== ''
    }
  },
  methods: {
    onSubmit () {
      AuthService.login({ username: this.username, password: this.password })
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
      localStorage.setItem('user', JSON.stringify(data.user));
      const user = JSON.parse(localStorage.getItem('user'));
      this.$store.commit('login');
      this.$store.dispatch('setUserId', user.id);
      this.$store.dispatch('setToken', data.token);
      this.$store.dispatch('setUser', data.user);
      this.$swal({
        title: 'Success',
        text: 'Successfully logged in, you are now being redirected',
        type: 'success',
        timer: 1000,
        showConfirmButton: false
        }).then(
          function() {},
          function (dismiss) {
            this.$router.push('home');
          }.bind(this)
          )
    },
    handleRejection(e, data) {
      if (data.status === 1) this.username = '';
      this.password = '';
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
