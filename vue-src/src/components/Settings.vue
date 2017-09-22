<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <panel title="Settings">
            <v-flex xs12>
        <form @submit.prevent="onSubmit">
          <v-layout row>
            <v-flex xs6 sm4 offset-sm2>
              <v-text-field
              v-model="firstName"
              name="firstName"
              label="First Name"
              ></v-text-field>
            </v-flex>

            <v-flex xs6 sm4>
              <v-text-field
              v-model="lastName"
              name="lastName"
              label="Last Name"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs6 sm4 offset-sm2>
              <v-text-field
              v-model="city"
              name="city"
              label="City"
              ></v-text-field>
            </v-flex>

            <v-flex xs6 sm4>
              <v-text-field
              v-model="state"
              name="state"
              label="State"
              ></v-text-field>
            </v-flex>

          </v-layout>
              <v-btn type="submit" primary>Save</v-btn>
        </form>
            </v-flex>
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
    if (store.getters.isUserLoggedIn) {
      next();
    } else {
      next('/login');
    }
  },
  async created () {
    try {
      const data = await AuthService.getSettings(this.$store.getters.user.id)
      this.firstName = data.settings[0];
      this.lastName = data.settings[1];
      this.city = data.settings[2];
      this.state = data.settings[3];
    } catch (e) {
      console.log(e);
    }
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async onSubmit () {
      try {
        const data = await AuthService.postSettings([this.firstName, this.lastName, this.city, this.state], this.$store.getters.user.id);
        if (!data.success) {
          this.$swal({
            title: 'Error',
            text: data.msg,
            type: 'error',
            timer: 1000,
            showConfirmButton: false
          }).catch(this.$swal.noop);
        } else {
          this.$swal({
            title: 'Success',
            text: 'Settings upated',
            type: 'success',
            timer: 1000,
            showConfirmButton: false
          }).catch(this.$swal.noop)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  
}
</script>

<style>
</style>
