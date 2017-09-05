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
        <v-list-tile to='/login'><v-list-tile-content>Login</v-list-tile-content></v-list-tile>
        <v-list-tile to='/register'><v-list-tile-content>Register</v-list-tile-content></v-list-tile>
      </v-list>
    </v-navigation-drawer>

  <v-toolbar absolute>
    <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
     <router-link id="title" to='/home'><v-toolbar-title href='/home'>Booktrader</v-toolbar-title></router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to='/home'>Home</v-btn>
      <v-btn v-if="!loggedIn" flat to='/login'>Login</v-btn>
      <v-btn v-if="loggedIn" flat to='/profile'>Profile</v-btn>
      <v-btn v-if="loggedIn"@click.native="onLogout" flat>Logout</v-btn>
      <v-btn v-if="!loggedIn" flat to='/register'>Register</v-btn>
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
  computed: {
    loggedIn () {
      return this.$store.getters.auth;
    }
  },
  methods: {
    onLogout () {
      AuthService.logout();
      this.$store.commit('logout');
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
    color: rgba(0,0,0,0.870588);
  }
</style>
