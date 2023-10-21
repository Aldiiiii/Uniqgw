<script>
import Card from '../components/Card.vue'
import { mapState, mapActions } from 'pinia';
import { useUniqgwStore } from '../stores/uniqgw';

export default {
  data(){
    return {

    }
  },
  components: {
    Card
  },
  computed: {
    ...mapState(useUniqgwStore, ['products'])
  },
  methods: {
    ...mapActions(useUniqgwStore, ['fetchProducts'])
  },
  beforeMount(){
    this.fetchProducts()
  }
}
</script>

<template>
    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <!-- cards -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          <Card v-for="item in products" :key="item.id" :item="item" />  
          
        </div>

        <!-- pagination -->
        <div class="mt-5">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link">Previous</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
</template>