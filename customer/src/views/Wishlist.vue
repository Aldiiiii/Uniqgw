<script>
import Card from './Card.vue'

export default {
  components: {
    Card
  }
}
</script>

<template>
    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <!-- cards -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          <Card />  
          
        </div>
      </div>
    </div>
</template>