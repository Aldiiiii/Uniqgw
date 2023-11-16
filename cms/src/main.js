import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const app = createApp(App)
app.use(ToastPlugin, {
    position: 'top-right'
});
app.use(vue3GoogleLogin, {
  clientId: '809525062533-kc419u49oejm7b3g8m0p2u9q332tdh5m.apps.googleusercontent.com'
})

app.mount('#app')