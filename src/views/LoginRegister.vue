<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.ts'
import { EventBus } from '@/commons/EventBus.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { AlertType, Role } from '@/commons/utils.ts'
import AlertComponent from '@/components/AlertComponent.vue'

/**
 * Route of the page.
 */
const route = useRoute()
/**
 * Whether the user is trying to log in or register.
 */
const isLogin: Ref<boolean> = ref(route.path !== '/register')
/**
 * Username of the user.
 */
const email: Ref<string> = ref('')
/**
 * First name of the user.
 */
const firstName: Ref<string> = ref('')

/**
 * Last name of the user.
 */
const secondName: Ref<string> = ref('')
/**
 * Password of the user.
 */
const password: Ref<string> = ref('')
/**
 * Confirm password input of the user.
 */
const confirmPassword: Ref<string> = ref('')

/**
 * Alert component reference.
 */
const alert: Ref<typeof AlertComponent> = ref(null)
/**
 * Submit button reference.
 */
const submitBtn = ref(null)

/**
 * Stores to handle authentication state.
 */
const authStore = useAuthStore()
/**
 * Whether the page is loading or not.
 */
const loading: Ref<boolean> = ref(false)
/**
 * Whether the user is logged in or not.
 */
const isLogged: Ref<boolean> = ref(authStore.isLogged)

/**
 * Shows an alert with the given text and type.
 * @param text Text to show in the alert.
 * @param type Type of the alert.
 */
function showAlert(text: string, type: AlertType = AlertType.INFO) {
  alert.value.show(text, type)
}

/**
 * Clears the alert.
 */
function clearAlert() {
  alert.value.clear()
}

/**
 * Checks if the password matches the reference.
 * @param newValue New value to check.
 * @param refToCheck reference to check.
 */
function checkPassword(newValue: string, refToCheck: Ref<string>) {
  if (isLogin.value === false) {
    if (newValue !== refToCheck.value) {
      showAlert('Passwords do not match', AlertType.DANGER)
      submitBtn.value.disabled = true
    } else {
      clearAlert()
      submitBtn.value.disabled = false
    }
  }
}

/**
 * Logs in the user with the given credentials. Shows an alert if the credentials are invalid,
 * otherwise redirects to the sources page.
 * @param email Email of the user.
 * @param password Password of the user.
 */
function login(email: string, password: string) {
  authStore
    .login(Role.User, email, password)
    .then(() => {
      loading.value = false
      EventBus.$emit('refresh-navbar')
      router.push('/sources')
    })
    .catch((e) => {
      console.log(e)
      loading.value = false
      showAlert('Invalid credentials', AlertType.DANGER)
    })
}

/**
 * Registers the user with the given credentials. Shows an alert if the email already exists,
 * otherwise logs in the user.
 * @param email Email of the user.
 * @param password Password of the user.
 * @param firstName First name of the user.
 * @param secondName Last name of the user.
 */
function register(email: string, password: string, firstName: string, secondName: string) {
  authStore
    .register(email, password, firstName, secondName)
    .then(() => {
      login(email, password)
    })
    .catch((e) => {
      const error = e.response.data.error.message.toString() ?? 'duplicate key'
      console.log(error)
      if (error.includes('duplicate key')) {
        showAlert('Email already exists', AlertType.DANGER)
      } else {
        showAlert(
          'An error occurred: try changing your password to a more complex one ' +
            '(i.e. at least 8 characters, one symbol, uppercase and lowercase, numbers)',
          AlertType.DANGER,
        )
      }
      loading.value = false
    })
}

/**
 * Handles the form submission. If the user is trying to log in, logs in the user,
 * otherwise registers the user.
 */
function handleSubmit() {
  if (isLogin.value) {
    loading.value = true
    login(email.value, password.value)
  } else {
    // Handle registration
    if (password.value === confirmPassword.value) {
      loading.value = true
      register(email.value, password.value, firstName.value, secondName.value)
    } else {
      // error
    }
  }
}

/**
 * Toggles the form between login and register.
 */
function toggleForm() {
  isLogin.value = !isLogin.value
  clearAlert()
  submitBtn.value.disabled = false
  confirmPassword.value = ''
}

watch(password, (newPassword) => checkPassword(newPassword, confirmPassword))
watch(confirmPassword, (newConfirmPassword) => checkPassword(newConfirmPassword, password))
</script>
<template>
  <div v-if="isLogged === false" class="login-register-view container py-4">
    <h1 class="text-center mb-4">{{ isLogin ? 'Login' : 'Register' }}</h1>
    <!-- Loading Spinner -->
    <div v-if="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <AlertComponent ref="alert" :cancellable="false"></AlertComponent>
    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input id="email" v-model="email" type="email" class="form-control dark-input" required />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          class="form-control dark-input"
          required
        />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          id="lastName"
          v-model="secondName"
          type="text"
          class="form-control dark-input"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control dark-input"
          required
        />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          class="form-control dark-input"
          required
        />
      </div>
      <button ref="submitBtn" type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ isLogin ? 'Login' : 'Register' }}
      </button>
    </form>
    <p class="text-center mt-3">
      <a href="#" @click.prevent="toggleForm">{{
        isLogin ? 'Create an account' : 'Already have an account? Login'
      }}</a>
    </p>
  </div>
  <div v-else>
    <h1 class="text-center">You are already logged in</h1>
    <router-link to="/sources" class="btn btn-primary">Go to Sources</router-link>
  </div>
</template>
<style scoped>
.login-register-view {
  background-color: #19191c;
  border-radius: 8px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  color: #ce29aa;
}

a {
  color: #ce29aa;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

.btn-primary {
  background-color: #ce29aa;
  border: none;
  color: white;
}

.btn-primary:hover {
  background-color: #a32088;
}
</style>
