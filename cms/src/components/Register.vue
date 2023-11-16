<script>
export default {
  props: ['messageError'],
  data() {
    return {
      register: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
      messageError: ""
    };
  },
  methods: {
    createUser() {
      this.$emit("createUser", this.register);
    },
    changePage(to){
      this.$emit('changePage', to)
    }
  },
  watch: {
    "register.password"(newValue, oldValue) {
      if (newValue.length < 5 && newValue.length > 0) {
        this.messageError = "Weak password";
      } else {
        this.messageError = "";
      }
    },
  },
  emits: ["createUser"],
};
</script>

<template>
  <div>
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form @submit.prevent="createUser" class="user">
                  <div class="form-group">
                    <input
                      v-model="register.username"
                      autocomplete="username"
                      type="text"
                      class="form-control form-control-user"
                      placeholder="Username"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      v-model="register.email"
                      autocomplete="username"
                      type="email"
                      class="form-control form-control-user"
                      placeholder="Email Address"
                    />
                  </div>
                  <div style="color:red">
                    {{ messageError }}
                  </div>
                  <div class="form-group">
                    <input
                      v-model="register.password"
                      type="password"
                      class="form-control form-control-user"
                      placeholder="Password"
                      autocomplete="new-password"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      v-model="register.phoneNumber"
                      type="text"
                      class="form-control form-control-user"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      v-model="register.address"
                      type="text"
                      class="form-control form-control-user"
                      placeholder="Address"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </button>
                  <hr />
                  
                </form>
                <hr />
                <div class="text-center">
                  <a
                    class="small"
                    href="login.html"
                    @click.prevent="changePage('login')"
                    >Already have an account? Login!</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
