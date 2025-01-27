import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AuthService } from './scripts/AuthService'

const initAuthService = async () => {
  if (AuthService.isAuthenticated()) {
    await AuthService.verifyToken()
  }
}

initAuthService().then((_) => console.log('Auth service initialized')) // eslint-disable-line @typescript-eslint/no-unused-vars

const app = createApp(App)

app.use(router)

app.mount('#app')
