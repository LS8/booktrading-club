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


export default {
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
      console.log(this.username, this.password, this.confirmPassword);
      AuthService.register({ username: this.username, email: this.email, password: this.password })
        .then( data => console.log(data))
    }
  }
  
}
</script>

<style>
</style>

