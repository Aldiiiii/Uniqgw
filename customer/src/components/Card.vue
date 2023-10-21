<script>
import {useUniqgwStore} from '../stores/uniqgw'
import { mapActions } from 'pinia'

export default {
    props: ['item', 'wishlist'],
    data(){
      return {
        name: '',
        imgUrl: '',
        CategoryName: '',
        id: '',
        price: ''
      }
    },
    methods: {
      ...mapActions(useUniqgwStore, ['addWishlist']),

      viewDetail(id){
        this.$router.push('/products/' + id)
      },
      handleAddWishlist(productId){
        this.addWishlist(productId)
      }
    },
    mounted(){
      console.log('haiiii', this.item)
      if(this.$route.path === '/wishlist') {
        this.name = this.wishlist.Product.name
        this.imgUrl = this.wishlist.Product.imgUrl
        this.CategoryName = this.wishlist.Product.Category.name
        this.id = this.wishlist.Product.id
        this.price = this.wishlist.Product.price
      }else if(this.$route.path === '/products'){
        this.name = this.item.name
        this.imgUrl = this.item.imgUrl,
        this.CategoryName = this.item.Category.name,
        this.id = this.item.id,
        this.price = this.item.price
      }
    }
}
</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <img :src="imgUrl"
      class="bd-placeholder-img card-img-top"
        
      />
      <div class="card-body">
        <strong>{{ name }}</strong>
        <p class="card-text"><small class="text-body-secondary">{{CategoryName}}</small></p>
        <p class="card-text">
          Rp.{{ price }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button @click.prevent="viewDetail(id)" type="button" class="btn btn-sm btn-outline-secondary">View detail</button>
            <button @click.prevent="handleAddWishlist(id)" type="button" class="btn btn-sm btn-outline-secondary">🖤 Wishlist</button>
          </div>
          <small class="text-body-secondary">9 mins</small>
        </div>
      </div>
    </div>
  </div>
</template>
