<template>
<v-app id="app">
  <navbar></navbar>
  <main>
    <v-container>
      <router-view id="content-wrapper"></router-view>
    </v-container>
  </main>
</v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    'navbar': Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
