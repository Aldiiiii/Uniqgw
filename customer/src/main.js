import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
// import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(vue3GoogleLogin, {
//   clientId: 'YOUR_GOOGLE_CLIENT_ID'
// })
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
