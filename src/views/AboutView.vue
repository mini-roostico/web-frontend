<template>
  <div class="about-view container py-4">
    <h1 class="text-center mb-4">About Us</h1>
    <p class="text-center">
      Welcome to Subjekt! TODO: Add more content here.
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutView',
  setup() {

    return {
    };
  }
});
</script>

<style scoped>
.about-view {
  background-color: #19191C;
  border-radius: 8px;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

h1 {
  color: #CE29AA;
}

p {
  color: #ccc;
}
</style>
