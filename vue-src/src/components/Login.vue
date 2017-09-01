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


export default {
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
          localStorage.setItem('user', JSON.stringify(data.user));
          var user = JSON.parse(localStorage.getItem('user'));
          this.$router.push('home');
        });
    }
  }
  
}
</script>

<style>
</style>
