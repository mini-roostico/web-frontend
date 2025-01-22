<template>
  <nav class="row nav-container mb-4 no-gutters">
    <div class="col-3 menu-mobile">
      <a class="menu-mobile-button" data-bs-toggle="collapse" href="#menuMobileCollapse"
         role="button" aria-expanded="false" aria-controls="menuMobileCollapse" ref="mobileCollapseBtn">
        <BootstrapIcon icon="bi bi-list" size="2.3rem" color="black"></BootstrapIcon>
      </a>
    </div>
    <div class="col logo-container">
      <router-link to="/" class="col-md-3 mb-2 mb-md-0">
        <img class="logo" src="@/assets/logo_small.png" alt="Site Logo">
      </router-link>
    </div>

    <ul class="links-desktop nav nav-pills col text-center align-items-center justify-content-center">
      <li v-for="link in links" :key="link.name">
        <router-link v-if="(link.loginNeeded && isLogged) || (!link.loginNeeded)"
                     :to="link.href" class="nav-item nav-link px-2 navbar-links">{{ link.name }}</router-link>
      </li>
    </ul>

    <div class="col loginButtons">
      <div v-if="!isLogged">
        <a role="button" class="btn btn-light mx-2" href="#/login">Sign In</a>
        <a role="button" class="btn btn-outline-success" href="#/register">Sign Up</a>
      </div>
      <div v-else>
        <NavbarUserDropdown :username="username" :first_name="first_name" @logout="logout"></NavbarUserDropdown>
      </div>
    </div>

    <div class="col-3 menu-mobile">
      <div v-if="!isLogged">
        <a role="button" href="#/login">
          <BootstrapIcon icon="bi bi-box-arrow-in-right" size="1.8rem" color="black"></BootstrapIcon>
        </a>
      </div>
      <div v-else>
        <NavbarUserDropdown :username="username" :first_name="first_name" @logout="logout"></NavbarUserDropdown>
      </div>
    </div>

    <div class="collapse menu-mobile" id="menuMobileCollapse" ref="collapse">
      <div class="collapse-body">
        <ul>
          <li v-for="link in links" :key="link.name">
            <div v-if="(link.loginNeeded && isLogged) || (!link.loginNeeded)">
              <router-link :to="link.href" class="navbar-links" @click="collapse">{{ link.name }}</router-link>
              <hr/>
            </div>
          </li>
          <li v-if="isLogged">
            <router-link :to="linkToNotification" class="navbar-links" @click="collapse">Notifications</router-link>
            <hr/>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ unreadMessage }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import BootstrapIcon from "@/components/BootstrapIcon.vue";
import NavbarUserDropdown from "@/components/NavbarUserDropdown.vue";

export default {
  name: 'NavbarComponent',
  components: {
    NavbarUserDropdown,
    BootstrapIcon,
  },
  data() {
    return {
      isLogged: true,
      first_name: '',
      username: '',
      links: [
        { href: "/", name: "Home", loginNeeded: false },
        { href: "/whiteboards", name: "Whiteboards", loginNeeded: true },
        { href: "/profile", name: "Profile", loginNeeded: true },
      ],
      linkToNotification: '/notifications',
      unreadMessage: 0
    };
  },
  methods: {
    collapse() {
      this.$refs.mobileCollapseBtn.click();
    },
    logout() {
      // Implement logout functionality
    }
  },
  mounted() {
    this.loadUnreadNotification();
  },
  methods: {
    loadUnreadNotification() {
      // Implement notification loading functionality
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.no-gutters {
  margin-right: 0;
  margin-left: 0;
  > .col,
  > [class*="col-"] {
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
  --bs-nav-link-color: #a9208c;
  --bs-nav-link-hover-color: #7e186a;
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
