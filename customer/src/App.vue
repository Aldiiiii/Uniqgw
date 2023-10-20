<script>
import { RouterView } from 'vue-router'
import Navbar from './views/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created(){
    console.log(this.$route)
    console.log(localStorage.access_token, `<<<<<<`)
  }
}
</script>

<template>
  <Navbar />
  <!-- <h1 v-if="$route.path !== '/login'">Hallo</h1> -->
  <RouterView />
</template>