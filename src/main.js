import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@fortawesome/fontawesome-free"

import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import { AuthService } from "@/scripts/AuthService.js";

const globalState = reactive({
  isLogged: false,
  user: null,
  setUser(userData) {
    this.user = userData
    this.isLogged = !!userData
  }
})

const initAuthService = async () => {
  if (AuthService.isAuthenticated()) {
    const isValid = await AuthService.verifyToken()
    if (isValid) {
      const user = AuthService.getCurrentUser()
      globalState.setUser(user)
    }
  }
}

initAuthService().then(r => console.log('Auth service initialized'))

const app= createApp(App)
app.provide('globalState', globalState)

app.use(router)

app.mount('#app')
