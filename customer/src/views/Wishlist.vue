<script>
import Card from '../components/Card.vue'
import { useUniqgwStore } from '../stores/uniqgw';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    Card
  },
  computed: {
    ...mapState(useUniqgwStore, ['wishlists'])
  },
  methods: {
    ...mapActions(useUniqgwStore, ['fetchWishlist'])
  },
  beforeMount(){
    this.fetchWishlist()
  }
}
</script>

<template>
    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <!-- cards -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          
          <Card v-if="this.$route.path === '/wishlist'" v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist" />  
          
        </div>
      </div>
    </div>
</template>