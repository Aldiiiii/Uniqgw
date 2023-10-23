<script>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created(){
    console.log(this.$toast)
  }
}
</script>

<template>
  <Navbar />
  <RouterView />
</template>