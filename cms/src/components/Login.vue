<script>
export default {
  props: ['messageError', 'callback'],
  data() {    
    return {      
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    getLogin() {
      this.$emit("getLogin", this.login);
    },
    changePage(to) {
      this.$emit("changePage", to)
    },
    callback(response){
      this.$emit("callback", response)
    }
  },
  emits: ["getLogin", "changePage"],
};

const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>

<template>  
  <div>
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form @submit.prevent="getLogin" class="user">
                      <div class="form-group">
                        <input
                          v-model="login.email"
                          autocomplete="username"
                          type="email"
                          class="form-control form-control-user"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div class="form-group">
                        <input
                          v-model="login.password"
                          type="password"
                          class="form-control form-control-user"
                          placeholder="Password"
                          autocomplete="current-password"
                        />
                        <span style="margin-left: 20px; color: red">{{
                          messageError
                        }}</span>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
                      <p class="text-center" style="margin-top: 20px;">Or login with</p>
                      <div style="display: flex; justify-content: center;">
                        <GoogleLogin :callback="callback"/>
                      </div>
                    </form>
                    <hr />
                    <div class="text-center">
                      <a @click.prevent="changePage('register')" class="small"
                        >Create an Account!</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
