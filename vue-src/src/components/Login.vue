<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <panel title="Login">
        <form @submit.prevent="onSubmit">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              v-model="username"
              name="username"
              :rules="[required]"
              label="Enter Username"
              required
              ></v-text-field>
              <v-text-field
              v-model="password"
              name="password"
              label="Enter Password"
              type="password"
              :rules="[required]"
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
    if (!store.getters.auth) {
      next();
    } else {
      next('/home');
    }
  },
  data () {
    return {
      username: '',
      password: '',
      required: (value) => !!value || 'Required.'
    }
  },
  computed: {
    formIsValid () {
      return this.username !== '' && this.password !== ''
    }
  },
  methods: {
    async onSubmit () {
      try {
        const data = await AuthService.login({ username: this.username, password: this.password });
        try { 
          this.handleSuccess(data);
        } catch (e) { this.handleRejection(e, data) }
      } catch (e) {
        this.handleRejection(e, data);
      }
    },
    handleSuccess(data) {
      if (!data.success) throw new Error;
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
