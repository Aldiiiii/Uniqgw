<script>
import Products from "./Products.vue";
import Form from "./Form.vue";
import Categories from "./Categories.vue";
import Histories from "./Histories.vue";

export default {
  emits: [
    "changeStatus",
    "changeSubPage",
    "changePage",
    "addProduct",
    "editProduct",
    "getLogout",
    "submitEdit",
    "categories",
    "histories",
  ],
  data() {
    return {
      addOrEdit: "",
    };
  },
  components: {
    Products,
    Form,
    Categories,
    Histories,
  },
  props: ["products", "categories", "histories", "subPage", "productFound"],
  methods: {
    changePage(to) {
      return this.$emit("changePage", to);
    },
    changeSubPage(to, isAddOrEdit) {
      if (isAddOrEdit) {
        this.addOrEdit = isAddOrEdit;
      }
      return this.$emit("changeSubPage", to);
    },
    changeStatus(status) {
      this.$emit("changeStatus", status);
    },
    addProduct(product) {
      this.$emit("addProduct", product);
    },
    editProduct(edit) {
      console.log(edit, "<<<<INI");
      const { to, isAddOrEdit, id } = edit;
      this.addOrEdit = isAddOrEdit;
      this.$emit("editProduct", { to, id });
    },
    getLogout() {
      this.$emit("getLogout");
    },
    submitEdit(data) {
      this.$emit("submitEdit", data);
    },
  },
  mounted() {
    (function ($) {
      "use strict"; // Start of us  e strict

      // Toggle the side navigation
      $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          $(".sidebar .collapse").collapse("hide");
        }
      });

      // Close any open menu accordions when window is resized below 768px
      $(window).resize(function () {
        if ($(window).width() < 768) {
          $(".sidebar .collapse").collapse("hide");
        }

        // Toggle the side navigation when window is resized below 480px
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
          $("body").addClass("sidebar-toggled");
          $(".sidebar").addClass("toggled");
          $(".sidebar .collapse").collapse("hide");
        }
      });

      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $("body.fixed-nav .sidebar").on(
        "mousewheel DOMMouseScroll wheel",
        function (e) {
          if ($(window).width() > 768) {
            var e0 = e.originalEvent,
              delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
          }
        }
      );

      // Scroll to top button appear
      $(document).on("scroll", function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $(".scroll-to-top").fadeIn();
        } else {
          $(".scroll-to-top").fadeOut();
        }
      });

      // Smooth scrolling using jQuery easing
      $(document).on("click", "a.scroll-to-top", function (e) {
        var $anchor = $(this);
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr("href")).offset().top,
            },
            1000,
            "easeInOutExpo"
          );
        e.preventDefault();
      });
    })(jQuery);
  },
};
</script>

<template>
  <div>
    <div id="wrapper">
      <!-- Sidebar -->
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">Uniqgw</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
          <a
            @click.prevent="changeSubPage('dashboard')"
            class="nav-link"
            href="tables.html"
          >
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a
          >
        </li>

        <!-- Divider -->

        <li class="nav-item">
          <a
            @click.prevent="changeSubPage('products')"
            class="nav-link"
            href="tables.html"
          >
            <i class="fas fa-fw fa-table"></i>
            <span>Products</span></a
          >
        </li>

        <li class="nav-item">
          <a
            @click.prevent="changeSubPage('categories')"
            class="nav-link"
            href="tables.html"
          >
            <i class="fas fa-fw fa-table"></i>
            <span>Categories</span></a
          >
        </li>

        <li class="nav-item">
          <a
            @click.prevent="changeSubPage('histories')"
            class="nav-link"
            href="tables.html"
          >
            <i class="fas fa-fw fa-table"></i>
            <span>Logs</span></a
          >
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block" />

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <div>
          <div id="content">
            <!-- Topbar -->
            <nav
              class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
            >
              <!-- Sidebar Toggle (Topbar) -->
              <button
                id="sidebarToggleTop"
                class="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i class="fa fa-bars"></i>
              </button>

              <!-- Topbar Search -->
              <form
                class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
              >
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                      <i class="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>

              <!-- Topbar Navbar -->
              <ul class="navbar-nav ml-auto">
                <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                <li class="nav-item dropdown no-arrow d-sm-none">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-search fa-fw"></i>
                  </a>
                  <!-- Dropdown - Messages -->
                  <div
                    class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form class="form-inline mr-auto w-100 navbar-search">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div class="input-group-append">
                          <button class="btn btn-primary" type="button">
                            <i class="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <!-- Nav Item - Alerts -->
                <li class="nav-item dropdown no-arrow mx-1">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="alertsDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-bell fa-fw"></i>
                    <!-- Counter - Alerts -->
                    <span class="badge badge-danger badge-counter">3+</span>
                  </a>
                  <!-- Dropdown - Alerts -->
                  <div
                    class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown"
                  >
                    <h6 class="dropdown-header">Alerts Center</h6>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="mr-3">
                        <div class="icon-circle bg-primary">
                          <i class="fas fa-file-alt text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div class="small text-gray-500">December 12, 2019</div>
                        <span class="font-weight-bold"
                          >A new monthly report is ready to download!</span
                        >
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="mr-3">
                        <div class="icon-circle bg-success">
                          <i class="fas fa-donate text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div class="small text-gray-500">December 7, 2019</div>
                        $290.29 has been deposited into your account!
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="mr-3">
                        <div class="icon-circle bg-warning">
                          <i class="fas fa-exclamation-triangle text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div class="small text-gray-500">December 2, 2019</div>
                        Spending Alert: We've noticed unusually high spending
                        for your account.
                      </div>
                    </a>
                    <a
                      class="dropdown-item text-center small text-gray-500"
                      href="#"
                      >Show All Alerts</a
                    >
                  </div>
                </li>

                <!-- Nav Item - Messages -->
                <li class="nav-item dropdown no-arrow mx-1">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="messagesDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-envelope fa-fw"></i>
                    <!-- Counter - Messages -->
                    <span class="badge badge-danger badge-counter">7</span>
                  </a>
                  <!-- Dropdown - Messages -->
                  <div
                    class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="messagesDropdown"
                  >
                    <h6 class="dropdown-header">Message Center</h6>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="../assets/img/undraw_profile_1.svg"
                          alt="..."
                        />
                        <div class="status-indicator bg-success"></div>
                      </div>
                      <div class="font-weight-bold">
                        <div class="text-truncate">
                          Hi there! I am wondering if you can help me with a
                          problem I've been having.
                        </div>
                        <div class="small text-gray-500">
                          Emily Fowler · 58m
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="../assets/img/undraw_profile_2.svg"
                          alt="..."
                        />
                        <div class="status-indicator"></div>
                      </div>
                      <div>
                        <div class="text-truncate">
                          I have the photos that you ordered last month, how
                          would you like them sent to you?
                        </div>
                        <div class="small text-gray-500">Jae Chun · 1d</div>
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="../assets/img/undraw_profile_3.svg"
                          alt="..."
                        />
                        <div class="status-indicator bg-warning"></div>
                      </div>
                      <div>
                        <div class="text-truncate">
                          Last month's report looks great, I am very happy with
                          the progress so far, keep up the good work!
                        </div>
                        <div class="small text-gray-500">
                          Morgan Alvarez · 2d
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                          alt="..."
                        />
                        <div class="status-indicator bg-success"></div>
                      </div>
                      <div>
                        <div class="text-truncate">
                          Am I a good boy? The reason I ask is because someone
                          told me that people say this to all dogs, even if they
                          aren't good...
                        </div>
                        <div class="small text-gray-500">
                          Chicken the Dog · 2w
                        </div>
                      </div>
                    </a>
                    <a
                      class="dropdown-item text-center small text-gray-500"
                      href="#"
                      >Read More Messages</a
                    >
                  </div>
                </li>

                <div class="topbar-divider d-none d-sm-block"></div>

                <!-- Nav Item - User Information -->
                <li class="nav-item dropdown no-arrow">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small"
                      ><a
                        @click.prevent="getLogout"
                        class="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
                        >LOGOUT</a
                      ></span
                    >
                  </a>
                  <!-- Dropdown - User Information -->
                </li>
              </ul>
            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->

            <!-- Dashboard -->
            <div v-if="subPage === 'dashboard'">
              <div class="container-fluid">
                <!-- Page Heading -->
                <div
                  class="d-sm-flex align-items-center justify-content-between mb-4"
                >
                  <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                  <a
                    href="#"
                    class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    ><i class="fas fa-download fa-sm text-white-50"></i>
                    Generate Report</a
                  >
                </div>

                <!-- Content Row -->
                <div class="row">
                  <!-- Card Products -->
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div
                              class="text-xs font-weight-bold text-info text-uppercase mb-1"
                            >
                              Products
                            </div>
                            <div class="row no-gutters align-items-center">
                              <div class="col-auto">
                                <div
                                  class="h5 mb-0 mr-3 font-weight-bold text-gray-800"
                                >
                                  {{ products.length }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i
                              class="fas fa-clipboard-list fa-2x text-gray-300"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Card Categories -->
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div
                              class="text-xs font-weight-bold text-info text-uppercase mb-1"
                            >
                              Categories
                            </div>
                            <div class="row no-gutters align-items-center">
                              <div class="col-auto">
                                <div
                                  class="h5 mb-0 mr-3 font-weight-bold text-gray-800"
                                >
                                  {{ categories.length }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i
                              class="fas fa-clipboard-list fa-2x text-gray-300"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Dashboard -->

            <!-- Product List -->
            <Products
              v-if="subPage === 'products'"
              :products="products"
              @changeStatus="changeStatus"
              :subPage="subPage"
              @changeSubPage="changeSubPage"
              :addOrEdit="addOrEdit"
              @editProduct="editProduct"
              :productFound="productFound"
            />
            <!-- End of Product List -->

            <!-- Form -->
            <Form
              v-if="subPage === 'form'"
              @addProduct="addProduct"
              :subPage="subPage"
              :categories="categories"
              :addOrEdit="addOrEdit"
              :productFound="productFound"
              @submitEdit="submitEdit"
            />
            <!-- End of Form -->

            <!-- Categories -->
            <Categories
              v-if="subPage === 'categories'"
              :categories="categories"
            />
            <!-- End of Categories -->

            <!-- Histories -->
            <Histories v-if="subPage === 'histories'" :histories="histories" />
            <!-- End of Histories -->

            <!-- /.container-fluid -->
          </div>
        </div>
      </div>
      <!-- End of Content Wrapper -->
    </div>
  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>
</template>
