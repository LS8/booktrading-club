<template>
<div>
  <h1>Profile</h1>
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
