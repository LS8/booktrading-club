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
      <v-btn flat to='/login'>Login</v-btn>
      <v-btn @click.native="onLogout" flat>Logout</v-btn>
      <v-btn flat to='/register'>Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <ul>
    <li>fdsfsf </li>
    <li>dfsf </li>
    <li>dfsfs </li>
  </ul>

</div>
</template>

<script>

import AuthService from '../services/AuthService';

export default {
  data() {
    return {
      drawer: null,
      auth: AuthService
    }
  },
  methods: {
    onLogout () {
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
  ul {
    margin-top: 80px;
    position: absolute;
  }
</style>
