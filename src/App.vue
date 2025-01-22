<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <NavbarComponent ref="navbar"></NavbarComponent>
  <router-view v-on:updateNotificationBadge="this.onVisualizeNotification" v-on:onLogin="this.onLogin"
               v-on:onBadToken="this.onBadToken" v-on:onChangedInfo="this.onChangedInfo" />
  <FooterComponent></FooterComponent>
</template>

<style>
html {
  background-color: #19191C;
}
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #19191C;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #D22BA8;
}
</style>
