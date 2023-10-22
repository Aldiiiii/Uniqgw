<script>
import { RouterLink } from 'vue-router'
import { useUniqgwStore } from '../stores/uniqgw'
import { mapActions } from 'pinia'

export default {
  data(){
    return {
      isLogin: false,
      searchName: ''
    }
  },
  methods: {
    ...mapActions(useUniqgwStore, ['getLogout','fetchProducts']),

    handleSearch(){
        this.$router.push('/products?name=' + this.searchName)
        this.fetchProducts({name: this.searchName})
    },

    handleLogout(){
      this.getLogout()
    }
  }
}
</script>
<template>
  <header class="navbar navbar-expand-lg bd-navbar sticky-top navbar-dark bg-dark">
    <nav class="container-fluid bd-gutter flex-wrap flex-lg-nowrap">
      <a class="navbar-brand" style="margin-left: 20px" href="#">Uniqgw</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas-body p-4 pt-0 p-lg-0" id="navbarNav">
        <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav">
          <li class="nav-item col-6 col-lg-auto active">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <RouterLink class="nav-link" to="/products">Product</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <RouterLink class="nav-link" to="/wishlist">Wishlist</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <a class="nav-link" @click.prevent="handleLogout">Logout</a>
          </li>
          <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
            <li>
              <form @submit.prevent="handleSearch" class="form-inline" style="display: flex; gap: 10px">
                <input
                  v-model="searchName"
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
              </form>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  </header>
</template>
