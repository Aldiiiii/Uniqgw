<script>
import Card from '../components/Card.vue'
import { mapState, mapActions } from 'pinia'
import { useUniqgwStore } from '../stores/uniqgw'
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      page: 1
    }
  },
  components: {
    Card,
    RouterLink
  },
  computed: {
    ...mapState(useUniqgwStore, ['products', 'totalPages', 'currentPage'])
  },
  methods: {
    ...mapActions(useUniqgwStore, ['fetchProducts', 'fetchWishlist']),

    changePage(page) {
      if(this.$route.query.name){
        this.$router.push('?name='+ this.$route.query.name + '&page=' + page)
      }else{
        this.$router.push('?page=' + page)
      }      
      let name = this.$route.query.name ? this.$route.query.name : ''
      this.fetchProducts({ page, name })
    },

    nextPage() {
      let next = this.currentPage + 1
      return this.changePage(next)
    },
    previosPage() {
      let next = this.currentPage - 1
      return this.changePage(next)
    }
  },
  mounted() {
    let page = this.$route.query.page ? this.$route.query.page : ''
    let name = this.$route.query.name ? this.$route.query.name : ''
    this.fetchProducts({ page, name })
  }
}
</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <!-- cards -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <Card
          v-if="this.$route.path === '/products'"
          v-for="item in products"
          :key="item.id"
          :item="item"
        />
      </div>

      <!-- pagination -->
      <div class="mt-5" v-if="this.$route.path !== '/'">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a @click="previosPage" href="#" class="page-link" v-if="currentPage > 1">Previous</a>
            </li>
            <li v-for="page in totalPages" class="page-item">
              <a @click="changePage(page)" class="page-link" href="#">{{ page }}</a>
            </li>
            <li class="page-item">
              <a @click="nextPage" v-if="currentPage < totalPages" class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
