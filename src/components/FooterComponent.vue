<script setup lang="ts">
import { ref } from 'vue'
import { Ref } from 'vue'

/**
 * Reference to the current year.
 */
const currentYear: Ref<number> = ref(new Date().getFullYear())
</script>
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/" class="footer-link">Home</router-link>
        <a
          href="https://github.com/mini-roostico/subjekt"
          target="_blank"
          class="footer-link github-link"
        >
          <i class="bi bi-github"></i> GitHub
        </a>
      </div>
      <div class="footer-copyright">© {{ currentYear }} Subjekt</div>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  flex-shrink: 0;
  background-color: #303033;
  color: #a0a0a0;
  padding: 1rem 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-link {
  color: #a0a0a0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #d22ba8;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-copyright {
  font-size: 0.8rem;
}
</style>
