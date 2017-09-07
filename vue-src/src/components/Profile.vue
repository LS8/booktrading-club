<template>
<div>
  <h1>Profile</h1>
  <v-layout row wrap>

    <v-flex xs12 sm6>
      <h2>Your books</h2>
    </v-flex>

    <v-flex xs12 sm6>
      <h2>Add a book</h2>
        <form @submit.prevent="onSubmit">
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
              v-model="searchTerm"
              name="searchTerm"
              label="Search the library"
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
import store from '../store.js'
export default {

  beforeRouteEnter (to, from, next) {
    if (store.getters.auth) {
      next();
    } else {
      next('/login');
    }
  },

}

</script>

<style>
</style>
