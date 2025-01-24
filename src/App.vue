<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <NavbarComponent ref="navbar"></NavbarComponent>
  <router-view v-on:onLogin="this.onLogin"
               v-on:onBadToken="this.onBadToken"/>
  <FooterComponent></FooterComponent>
</template>

<style>

/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';

@import '@/assets/main.css';

html {
  background-color: #19191C;
}
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #19191C;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #D22BA8;
}
</style>
