import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

// Import our custom CSS
import './scss/style.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import './axios'
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);

pinia.use(({store})=>{
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
