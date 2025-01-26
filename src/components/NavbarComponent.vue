<script setup>
import BootstrapIcon from '@/components/BootstrapIcon.vue'
import NavbarUserDropdown from '@/components/NavbarUserDropdown.vue'
import { onMounted, ref } from 'vue'
import { AuthService } from '@/scripts/AuthService.js'
import router from '@/router/index.js'
import { EventBus } from '@/scripts/EventBus.js'

const isLogged = ref(AuthService.isAuthenticated())
const links = ref([
  { href: '/', name: 'Home', loginNeeded: false },
  { href: '/sources', name: 'Sources', loginNeeded: true },
  { href: '/about', name: 'About', loginNeeded: false },
])

function reloadNavbar() {
  isLogged.value = AuthService.isAuthenticated()
}

function logout() {
  AuthService.logout()
  router.push('/')
  isLogged.value = false
}

onMounted(() => {
  EventBus.$on('refresh-navbar', () => {
    reloadNavbar()
  })
})

defineExpose({ reloadNavbar, logout })
</script>
<template>
  <nav class="row nav-container mb-4 no-gutters">
    <div class="col-3 menu-mobile">
      <a
        class="menu-mobile-button"
        data-bs-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="menuMobileCollapse"
        ref="mobileCollapseBtn"
        @click="$refs.mobileCollapse.toggleMobileMenu"
      >
        <BootstrapIcon icon="bi bi-list" size="2.3rem" color="black"></BootstrapIcon>
      </a>
    </div>
    <div class="col logo-container">
      <router-link to="/" class="col-md-3 mb-2 mb-md-0">
        <img class="logo" src="@/assets/logo_small.png" alt="Site Logo" />
      </router-link>
    </div>

    <ul
      class="links-desktop nav nav-pills col text-center align-items-center justify-content-center"
    >
      <li v-for="link in links" v-bind:key="link">
        <router-link
          v-if="(link.loginNeeded && isLogged) || !link.loginNeeded"
          :to="link.href"
          class="nav-item nav-link px-2 navbar-links"
          >{{ link.name }}</router-link
        >
      </li>
    </ul>
    <div class="col loginButtons">
      <div v-if="!isLogged">
        <router-link role="button" class="btn btn-light mx-2" to="/login">Sign In</router-link>
        <router-link role="button" class="btn btn-outline-primary" to="/register"
          >Sign Up</router-link
        >
      </div>
      <div v-else>
        <NavbarUserDropdown @logout="logout"></NavbarUserDropdown>
      </div>
    </div>
    <div class="col-3 menu-mobile">
      <div v-if="!isLogged">
        <router-link role="button" to="/login">
          <BootstrapIcon
            icon="bi bi-box-arrow-in-right"
            size="1.8rem"
            color="black"
          ></BootstrapIcon>
        </router-link>
      </div>
      <div v-else>
        <NavbarUserDropdown @logout="logout"></NavbarUserDropdown>
      </div>
    </div>
  </nav>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.btn-outline-primary {
  --bs-btn-color: #c226a0;
  --bs-btn-border-color: #6c155b;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #c226a0;
  --bs-btn-hover-border-color: #c226a0;
  --bs-btn-focus-shadow-rgb: 13, 110, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #a9208c;
  --bs-btn-active-border-color: #a9208c;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #6c155b;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #6c155b;
  --bs-gradient: none;
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;

  > .col,
  > [class*='col-'] {
    padding-right: 0;
    padding-left: 0;
  }
}

.logo-container {
  display: flex;
  justify-content: flex-start; /* Aligns the logo to the left */
  align-items: center;
}

li {
  list-style-type: none;
}

.menu-mobile {
  display: none;
}

.logo {
  max-width: 135px;
  max-height: 38px;
}

.loginButtons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container {
  background-color: #303033;
  box-shadow: 0 1px 2px #212123;
  min-height: 77px;
}

.nav {
  --bs-nav-link-color: #b7b7b7;
  --bs-nav-link-hover-color: #a9208c;
}

@media (max-width: 1002px) {
  .menu-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginButtons {
    display: none;
  }
  .menu-mobile-button {
    transition: all 300ms ease;
  }
  .menu-mobile-button:active {
    filter: brightness(50%);
  }
  .links-desktop {
    display: none;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-container {
    min-height: 80px;
  }
  .logo {
    display: inline-block;
  }
  .collapse-body {
    padding: 10px;
  }

  .navbar-links {
    font-size: 1rem;
    display: block;
    margin: 15px;
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
  }
}
</style>
