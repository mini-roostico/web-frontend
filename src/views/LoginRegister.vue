<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.ts'
import { EventBus } from '@/scripts/EventBus.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { Role } from '@/commons/utils.ts'

type AlertType = 'alert-info' | 'alert-danger' | 'alert-success'

const route = useRoute()
const isLogin: Ref<boolean> = ref(route.path !== '/register')
const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const confirmPassword: Ref<string> = ref('')

const alertText: Ref<string> = ref('')
const alertType: Ref<AlertType> = ref('alert-info')
const submitBtn = ref(null)

const authStore = useAuthStore()
const loading: Ref<boolean> = ref(false)
const isLogged: Ref<boolean> = ref(authStore.isLogged)

function showAlert(text: string, type: AlertType = 'alert-info') {
  alertText.value = text
  alertType.value = type
}

function clearAlert() {
  alertText.value = ''
}

function checkPassword(newValue: string, refToCheck: Ref<string, string>) {
  if (isLogin.value === false) {
    if (newValue !== refToCheck.value) {
      showAlert('Passwords do not match', 'alert-danger')
      submitBtn.value.disabled = true
    } else {
      clearAlert()
      submitBtn.value.disabled = false
    }
  }
}

function login(username: string, password: string) {
  authStore
    .login(Role.User, username, password)
    .then(() => {
      loading.value = false
      EventBus.$emit('refresh-navbar')
      router.push('/sources')
    })
    .catch((e) => {
      console.log(e)
      loading.value = false
      showAlert('Invalid credentials', 'alert-danger')
    })
}

function register(username: string, password: string) {
  authStore
    .register(username, password)
    .then(() => {
      login(username, password)
    })
    .catch(() => {
      loading.value = false
      showAlert('Username already exists', 'alert-danger')
    })
}

function handleSubmit() {
  if (isLogin.value) {
    loading.value = true
    login(username.value, password.value)
  } else {
    // Handle registration
    if (password.value === confirmPassword.value) {
      loading.value = true
      register(username.value, password.value)
    } else {
      // error
    }
  }
}

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
    <!-- Alert Component -->
    <div
      v-if="alertText"
      class="alert alert-dismissible alert-dark fade show"
      :class="alertType"
      role="alert"
    >
      {{ alertText }}
      <button type="button" class="btn-close" aria-label="Close" @click="clearAlert"></button>
    </div>
    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          v-model="username"
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
