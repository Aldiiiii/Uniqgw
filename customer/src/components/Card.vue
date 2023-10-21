<script>
import { RouterLink } from 'vue-router';

export default {
    props: ['item'],
    components: { RouterLink },
    methods: {
      viewDetail(id){
        this.$router.push('/products/' + id)
      }
    }
}
</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <!-- <svg
        class="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: Thumbnail"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#55595c" />
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
      </svg> -->
      <img :src="item.imgUrl"
      class="bd-placeholder-img card-img-top"
        
      />
      <div class="card-body">
        <strong>{{ item.name }}</strong>
        <p class="card-text"><small class="text-body-secondary">{{item.Category.name}}</small></p>
        <p class="card-text">
          Rp.{{ item.price }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button @click.prevent="viewDetail(item.id)" item.id type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
          </div>
          <small class="text-body-secondary">9 mins</small>
        </div>
      </div>
    </div>
  </div>
</template>
