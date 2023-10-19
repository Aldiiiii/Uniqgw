<script>
import { RouterLink, RouterView } from 'vue-router';

export default { components: { RouterLink } }
</script>

<template>
  <!-- home -->
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5 mt-3">
        <div class="col-lg-6 col-md-8 mx-auto" >
          <h1 class="fw-light">Uniqgw</h1>
          <p class="lead text-body-secondary">
            Welcome to Uniqgw, your go-to destination for fashion-forward products. At Uniqgw, we
            offer a wide range of trendy and stylish fashion items to cater to your unique sense of
            style.
          </p>
          <p>
            <RouterLink to="/products" class="btn btn-dark my-2">Products</RouterLink>
            <a href="#" class="btn btn-light my-2">Login</a>
          </p>
        </div>
      </div>
    </section>

    <!-- Products -->
    <RouterView />
  </main>

  <footer class="text-body-secondary py-5">
    <div class="container">
      <p class="float-end mb-1">
        <a href="#">Back to top</a>
      </p>
      <p class="mb-1">
        <strong>Uniqgw</strong>
      </p>
      <p class="mb-0">
        This website using HTML, CSS, Javascript, Express and Vue.js <br />
        My Github profile is <a href="https://github.com/Aldiiiii" target="_blank">here</a>.
      </p>
    </div>
  </footer>
</template>
