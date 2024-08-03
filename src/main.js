//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import '@/assets/css/main.scss'
import './registerServiceWorker'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
