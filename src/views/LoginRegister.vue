<template>
  <div class="login-register-view container py-4">
    <h1 class="text-center mb-4">{{ isLogin ? 'Login' : 'Register' }}</h1>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-primary w-100">{{ isLogin ? 'Login' : 'Register' }}</button>
    </form>
    <p class="text-center mt-3">
      <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'Create an account' : 'Already have an account? Login' }}</a>
    </p>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'LoginRegisterView',
  setup() {
    const route = useRoute();
    const isLogin = ref(route.path !== '/register');
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const toggleForm = () => {
      isLogin.value = !isLogin.value;
    };

    const handleSubmit = () => {
      if (isLogin.value) {
        // Handle login
        console.log('Logging in with', username.value, password.value);
      } else {
        // Handle registration
        if (password.value === confirmPassword.value) {
          console.log('Registering with', username.value, password.value);
        } else {
          console.error('Passwords do not match');
        }
      }
    };

    return {
      isLogin,
      username,
      password,
      confirmPassword,
      toggleForm,
      handleSubmit
    };
  }
});
</script>

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
}

.btn-primary:hover {
  background-color: #a32088;
}
</style>
