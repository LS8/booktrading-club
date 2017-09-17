<template>
<div>
     <v-navigation-drawer
      v-model="drawer"
      temporary
      light 
      overflow
      absolute
    >
      <v-list>
        <v-list-tile to='/home'><v-list-tile-content>Home</v-list-tile-content></v-list-tile>
        <v-list-tile v-if="!$store.state.isUserLoggedIn" to='/login'><v-list-tile-content>Login</v-list-tile-content></v-list-tile>
        <v-list-tile v-if="!$store.state.isUserLoggedIn" to='/register'><v-list-tile-content>Register</v-list-tile-content></v-list-tile>
        <v-list-tile v-if="$store.state.isUserLoggedIn" to='/profile'><v-list-tile-content>Profile</v-list-tile-content></v-list-tile>
        <v-list-tile v-if="$store.state.isUserLoggedIn" to='#' @click.native="onLogout"><v-list-tile-content>Logout</v-list-tile-content></v-list-tile>
      </v-list>
    </v-navigation-drawer>

  <v-toolbar class="cyan" dark absolute>
    <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
     <v-toolbar-title href='/home'><router-link id="title" to='/home'>Booktrader</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to='/home'>Home</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat to='/login'>Login</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat to='/register'>Register</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat to='/profile'>Profile</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" @click.native="onLogout" flat>Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</div>

</template>

<script>

import AuthService from '../services/AuthService';

export default {
  data() {
    return {
      drawer: null,
    }
  },
  methods: {
    onLogout () {
      AuthService.logout();
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$swal({
        title: 'Info',
        text: 'You are now logged out',
        type: 'info',
        timer: 1000,
        showConfirmButton: false
      }).catch(this.$swal.noop);
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
  #title {
    text-decoration: none;
    color: rgb(255,255,255);
    transition: .1s ease-in-out;
  }
  #title:hover {
     color: #424242;
  }
</style>
