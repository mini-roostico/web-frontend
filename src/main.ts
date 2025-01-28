import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axiosSetup from './commons/axios.ts'

const app = createApp(App)

app.use(createPinia())
// This needs to be called after app.use(pinia) but before mounting the root container
// otherwise may happen that the axios configuration is loaded after some components, on mounts,
// make requests, leading to errors in authentication requests or response not correctly handled.
axiosSetup()
app.use(router)

app.mount('#app')
