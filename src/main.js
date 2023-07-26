import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from 'axios'
import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

axios.defaults.baseURL = 'http://192.168.0.131:8080'
app.config.globalProperties.$axios = axios

app.use(router).use(pinia).mount('#app')
