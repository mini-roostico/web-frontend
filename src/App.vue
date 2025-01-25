<script setup>
import {RouterView} from 'vue-router'
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <div class="app-container">
    <NavbarComponent ref="navbar"></NavbarComponent>
    <main class="content">
      <router-view/>
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@/assets/main.css';

html, body {
  height: 100%;
  margin: 0;
  background-color: #19191C;
}

#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #19191C;
  min-height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1 0 auto;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #D22BA8;
}
</style>
