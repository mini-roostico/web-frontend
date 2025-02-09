<script setup lang="ts">
import { ref, computed, Ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

/**
 * Stores that helps to manage the authentication state.
 */
const authStore = useAuthStore()

/**
 * The username of the user.
 */
const username: Ref<string> = ref(authStore.user)

/**
 * The first name of the user.
 */
const firstName = ref(authStore.userFirstName)

/**
 * Emits the events to the parent component. The events are:
 * - logout: emitted when the user logs out.
 */
const emit = defineEmits(['logout'])

/**
 * The initials of the user, displayed in the avatar.
 */
const userInitials = computed(() =>
  firstName.value
    .split(' ')
    .map((name) => name[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)

/**
 * Generates a gradient based on the username.
 *
 * @param username The username to generate the gradient.
 * @returns The gradient generated.
 */
function generateGradient(username: string): string {
  const hash = username.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)

  const h1 = Math.abs(hash % 360)
  const h2 = (h1 + 180) % 360

  return `linear-gradient(135deg, hsl(${h1}, 70%, 60%), hsl(${h2}, 70%, 60%))`
}

/**
 * The gradient background of the avatar.
 */
const gradientBackground = computed(() => generateGradient(username.value))

/**
 * Logs out the user.
 */
function logout(): void {
  emit('logout')
}
</script>
<template>
  <div class="user-avatar-dropdown">
    <div
      id="dropdownMenuButton"
      class="user-avatar"
      :style="{ background: gradientBackground }"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="user-initials">{{ userInitials }}</span>
    </div>

    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <div class="dropdown-header">
        <div class="dropdown-avatar" :style="{ background: gradientBackground }">
          <span class="user-initials">{{ userInitials }}</span>
        </div>
        <div class="user-info">
          <div class="user-name">{{ firstName }}</div>
        </div>
      </div>
      <div class="dropdown-divider"></div>
      <div class="dropdown-items">
        <router-link to="/sources" class="dropdown-item">
          <i class="bi bi-file"></i> Sources
        </router-link>
        <div class="dropdown-item" @click="logout">
          <i class="bi bi-box-arrow-right"></i> Logout
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.user-avatar-dropdown {
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  color: white;
  border: 1px solid #333;
}

.dropdown-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #333;
}

.dropdown-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: white;
  font-weight: bold;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-weight: bold;
}

.dropdown-items {
  padding: 10px 0;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
}

.dropdown-item:hover {
  background-color: #2a2a2a;
}

.dropdown-item i {
  margin-right: 10px;
}
</style>
