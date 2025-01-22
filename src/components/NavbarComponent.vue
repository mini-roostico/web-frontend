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

      <ul class="links-desktop nav nav-pills col text-center align-items-center justify-content-center ">
        <li v-for="link in this.links">
            <router-link v-if="(link.loginNeeded && this.isLogged) || (!link.loginNeeded)"
                      :to="link.href" class="nav-item nav-link px-2 navbar-links">{{link.name}}</router-link>
        </li>

      </ul>
        <div class="col loginButtons">
            <div v-if="!isLogged">
                <a role="button" class="btn btn-light mx-2"  href="/login">Sign In</a>
                <a role="button" class="btn btn-outline-primary" href="/register">Sign Up</a>
            </div>
            <div v-else>
              <NavbarUserDropdown :username="this.username" :first_name="this.first_name" @logout="this.logout"></NavbarUserDropdown>
            </div>
        </div>
      <div class="col-3 menu-mobile">
        <div v-if="!isLogged">
          <a role="button" href="#/login">
            <BootstrapIcon icon="bi bi-box-arrow-in-right" size="1.8rem" color="black"></BootstrapIcon>
          </a>
        </div>
        <div v-else>
          <NavbarUserDropdown :username="this.username" :first_name="this.first_name" @logout="this.logout"></NavbarUserDropdown>
        </div>
      </div>
      <div class="collapse menu-mobile" id="menuMobileCollapse" ref="collapse">
        <div class="collapse-body">
          <ul>
            <li v-for="link in this.links">
              <div v-if="(link.loginNeeded && this.isLogged) || (!link.loginNeeded)">
                <router-link :to="link.href" class="navbar-links" @click="this.collapse">{{ link.name }}</router-link>
                <hr/>
              </div>
            </li>
              <li>
                  <div v-if="this.isLogged" class="position-relative">
                      <router-link :to="this.linkToNotification" class="navbar-links" @click="this.collapse">{{ "Notifications" }}</router-link>
                      <hr/>
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{this.unreadMessage}}
              </span>
                  </div>
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
    props: ['loginStatus'],
    components: {
      NavbarUserDropdown,
      BootstrapIcon,
    },
    data() {
        return {
            isLogged: false,
            first_name: '',
            defaultRefreshTimeoutMs: 5 * 60 * 1000,
            username: '',
            links: [
              {href: "/", name: "Home", loginNeeded: false},
              {href: "/sources", name: "Sources", loginNeeded: false},
              {href: "/about", name: "About", loginNeeded: false},
            ],
            linkToNotification: '/notifications',
            unreadMessage:  0
        }
    },
    created() {
        this.loadUnreadNotification();
    },
    methods: {
        collapse() {
            this.$refs.mobileCollapseBtn.click();

        },
        updateNotificationNumber(){
          this.unreadMessage++;
        },
        loadUnreadNotification(){

        },
        reloadNavbar() {

        },
        logout() {

        },
        changeName(name) {
            this.first_name = name;
        }
    },
    updated: function() {
      this.reloadNavbar();
      this.loadUnreadNotification();
    },
    mounted: function() {
        this.reloadNavbar();
        this.loadUnreadNotification();
    }
}
</script>

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
