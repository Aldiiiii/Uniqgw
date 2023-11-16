<script>
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";

export default {
  components: {
    Login,
    Register,
    Home,
  },
  data() {
    return {
      baseUrl: "http://localhost:3000",
      products: [],
      productFound: {},
      categories: [],
      histories: [],
      messageError: "",
      page: "login",
      subPage: "",
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "/products",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.products = data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async fetchCategories() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "/categories",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.categories = data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async fetchHistories() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "/histories",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.histories = data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async editProduct(edit){
      try {
        console.log(edit)
        const {to, id} = edit
        const { data } = await axios({
          url: this.baseUrl + "/products/" + id,
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.subPage = to
        this.productFound = data;
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    },
    async submitEdit(data){
      try {
        await axios({          
          url: this.baseUrl + "/products/" + data.id,
          method: "put",
          data: data,
          headers: {
            access_token: localStorage.getItem("access_token"),
          }
        });
        this.fetchProducts()
        this.subPage = "products";
        this.$toast.success("Edit success")
        this.fetchHistories()
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    },
    changePage(to) {
      if (to === "login") {
        localStorage.clear();
      }
      this.page = to;
    },
    changeSubPage(to) {
      this.subPage = to;
    },
    async getLogin(user) {
      try {
        const login = await axios({
          url: this.baseUrl + "/login",
          method: "post",
          data: user,
        });

        this.$toast.success("Login Success")
        localStorage.setItem("access_token", login.data.token);
        this.fetchProducts();
        this.fetchCategories();
        this.fetchHistories()
        this.page = "home";
        this.subPage = "dashboard";
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    },
    async loginGoogle(response){
      try {
        const login = await axios({
          url: this.baseUrl + "/login-google",
          method: "post",
          headers: {
            google_token: response.credential
          },
        });
        localStorage.setItem("access_token", login.data.token);
        this.fetchProducts();
        this.fetchCategories();
        this.fetchHistories()
        this.page = "home";
        this.subPage = "dashboard";
        this.$toast.success("Login Success")
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    },
    getLogout(){
      localStorage.clear()
      this.page = 'login'
      this.subPage = ''
      this.$toast.success("Logout Success")
    },
    async createUser(newUser) {
      try {
        await axios({
          url: this.baseUrl + "/register",
          method: "post",
          data: newUser,
        });
        this.page = "login";
        this.$toast.success("Register Success")
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    },
    async changeStatus(status) {
      try {
        const { newStatus, productId } = status;
        await axios({
          url: this.baseUrl + "/products/" + productId,
          method: "patch",
          data: {
            status: newStatus
          },
          headers: {
            access_token: localStorage.getItem("access_token"),
          }
        });
        this.$toast.success("Change status success")
        this.fetchProducts()
        this.fetchHistories()
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    },
    async addProduct(newProduct){
      try {
        await axios({
          url: this.baseUrl + "/products",
          method: "post",
          data: newProduct,
          headers: {
            access_token: localStorage.getItem("access_token"),
          }
        });
        console.log(newProduct, `<<<< OBJECT PRODUCT`)
        this.$toast.success("Add product success")
        this.fetchProducts()
        this.fetchHistories()
        this.subPage = "products";
      } catch (error) {
        this.$toast.error(error.response.data.message)
      }
    }   
  },
  created() {
    if (localStorage.access_token) {
      this.page = "home";
      this.subPage = "dashboard";
      this.fetchProducts();
      this.fetchCategories();
      this.fetchHistories()
    }
  }
};
</script>

<template>
  <Login
    v-if="page === 'login'"
    @getLogin="getLogin"
    @changePage="changePage"
    @callback="loginGoogle"
  />

  <Register
    v-if="page === 'register'"
    @createUser="createUser"
    @changePage="changePage"
  />

  <Home
    v-if="page === 'home'"
    :products="products"
    :categories="categories"
    :histories="histories"
    @changeSubPage="changeSubPage"
    :subPage="subPage"
    @changeStatus="changeStatus"
    @addProduct="addProduct"
    @editProduct="editProduct"
    :productFound="productFound"
    @getLogout="getLogout"
    @submitEdit="submitEdit"
  />
</template>
