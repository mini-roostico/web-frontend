import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AuthService } from './scripts/AuthService'

const initAuthService = async () => {
  if (AuthService.isAuthenticated()) {
    const isValid = await AuthService.verifyToken()
    if (isValid) {
      const user = AuthService.getCurrentUser()
    }
  }
}
/* eslint-disable no-unused-vars */
initAuthService().then((_) => console.log('Auth service initialized'))

const app = createApp(App)

app.use(router)

app.mount('#app')
