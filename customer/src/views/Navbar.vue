<script>
export default {
    
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
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <a class="nav-link" href="#">Products</a>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <a class="nav-link" href="#">Login</a>
          </li>
          <li class="nav-item col-6 col-lg-auto">
            <a class="nav-link disabled" href="#">Logout</a>
          </li>
          <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
            <li>
              <form class="form-inline" style="display: flex; gap: 10px">
                <input
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