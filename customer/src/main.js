import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
  clientId: '809525062533-kc419u49oejm7b3g8m0p2u9q332tdh5m.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.use(ToastPlugin, {
  position: 'top-right'
});

app.mount('#app')
