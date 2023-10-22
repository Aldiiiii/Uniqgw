<script>
import { mapActions, mapState } from 'pinia'
import { useUniqgwStore } from '../stores/uniqgw'

export default {
  methods: {
    ...mapActions(useUniqgwStore, ['productById'])
  },
  computed: {
    ...mapState(useUniqgwStore, ['product'])
  },
  beforeMount() {
    this.productById(this.$route.params.id)
  }
}
</script>
<template>
  <div class="justify-content-center" style="display: flex; max-height: 90vh">
    <div class="card mb-3 mt-5" style="width: 85vw; display: flex; align-items: center">
      <div class="row g-0" style="width: 85vw">
        <div class="col-md-4">
          <img
            :src="product.imgUrl"
            class="img-fluid rounded-start"
            style="height: fit-content"
            alt="..."
          />
        </div>
        <div class="col-md-8" style="display: flex; align-items: center">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">
              <small class="text-body-secondary">{{ product.Category.name }}</small>
            </p>
            <hr />
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">Stock: {{ product.stock }}</p>
            <p class="card-text">Rp. {{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
