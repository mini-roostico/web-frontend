<script setup>
import {inject, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import router from "@/router/index.js";
import {AuthService} from "@/scripts/AuthService.js";
import {EventBus} from "@/scripts/EventBus.js";

const route = useRoute();
const isLogin = ref(route.path !== '/register');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const alertText = ref('');
const alertType = ref('alert-info');
const submitBtn = ref(null);

const loading = ref(false);

const showAlert = (text, type = 'alert-info') => {
  alertText.value = text;
  alertType.value = type;
};

const clearAlert = () => {
  alertText.value = '';
};

function checkPassword(newValue, refToCheck) {
  if (isLogin.value === false) {
    if (newValue !== refToCheck.value) {
      showAlert('Passwords do not match', 'alert-danger');
      submitBtn.value.disabled = true;
    } else {
      clearAlert();
      submitBtn.value.disabled = false;
    }
  }
}

watch(password, (newPassword) => checkPassword(newPassword, confirmPassword));
watch(confirmPassword, (newConfirmPassword) => checkPassword(newConfirmPassword, password));

const toggleForm = () => {
  isLogin.value = !isLogin.value;
  clearAlert();
  submitBtn.value.disabled = false;
  confirmPassword.value = '';
};

const isLogged = ref(AuthService.isAuthenticated());

const handleSubmit = () => {
  if (isLogin.value) {
    loading.value = true;
    AuthService.login({username: username.value, password: password.value}).then((response) => {
      const {success} = response
      loading.value = false;
      if (success === true) {
        EventBus.$emit('refresh-navbar');
        router.push('/sources');
      } else {
        showAlert('Invalid credentials', 'alert-danger');
      }
    });
  } else {
    // Handle registration
    if (password.value === confirmPassword.value) {
      console.log('Registering with', username.value, password.value);
    } else {
      console.error('Passwords do not match');
    }
  }
};
</script>
<template>
  <div class="login-register-view container py-4" v-if="isLogged === false">
    <h1 class="text-center mb-4">{{ isLogin ? 'Login' : 'Register' }}</h1>
    <!-- Loading Spinner -->
    <div v-if="loading">
      <div
        class="spinner-border"
        role="status"
      >
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
      <button
        type="button"
        class="btn-close"
        @click="clearAlert"
        aria-label="Close"
      ></button>
    </div>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control dark-input" id="username" v-model="username"
               required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control dark-input" id="password" v-model="password"
               required>
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control dark-input" id="confirmPassword"
               v-model="confirmPassword" required>
      </div>
      <button ref="submitBtn" type="submit" class="btn btn-primary w-100">{{
          isLogin ? 'Login' : 'Register'
        }}
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
  background-color: #19191C;
  border-radius: 8px;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  color: #CE29AA;
}

a {
  color: #CE29AA;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

.btn-primary {
  background-color: #CE29AA;
  border: none;
  color: white;
}

.btn-primary:hover {
  background-color: #a32088;
}
</style>
