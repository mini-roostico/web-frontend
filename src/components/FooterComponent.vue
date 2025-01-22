<template>
  <footer class="footer py-3">
    <ul class="nav justify-content-center align-middle pb-3 mb-3">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
      <li class="nav-item"><a class="link-dark nav-link px-2 text-body-secondary"
                              href="https://github.com/mini-roostico/subjekt">
        <i class="bi bi-github"></i>
      </a>
      </li>
    </ul>
  </footer>
</template>
<script>
export default {
  name: "FooterComponent"
}
</script>
<style scoped>
.footer {
  margin-top: 100px !important;
  background-color: #303033 !important;
}

a, p {
  color: #19191C !important;
}

</style>
