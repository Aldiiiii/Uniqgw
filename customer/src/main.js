import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '809525062533-kc419u49oejm7b3g8m0p2u9q332tdh5m.apps.googleusercontent.com'
})
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
