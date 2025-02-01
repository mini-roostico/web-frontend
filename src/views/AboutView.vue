<script setup lang="ts"></script>
<template>
  <div class="about-view container py-4">
    <h1 class="text-center mb-4">About Subjekt</h1>
    <p>
      Subjekt is a simple tool to easily create files based on some template, specified in a YAML
      configuration file. Internally, it uses a custom compiler to process expressions inside the
      YAML file in order to create permutations of custom parameters' values.
    </p>
    <p>
      The tool is designed to be used by developers, but it can be used by anyone who needs to
      generate files based on a template.
    </p>
    <p>
      The project is open-source and can be found on GitHub at the
      <a href="https://github.com/mini-roostico/subjekt">this link</a>.
    </p>
    <h1 class="text-center mb-4">Who are we</h1>
    <p>
      We are a group of computer science students from the University of Bologna, Italy. You can
      find more about us on our GitHub
      <a href="https://github.com/mini-roostico">organization page</a> and profiles.
    </p>
  </div>
</template>
<style scoped>
.about-view {
  background-color: #19191c;
  border-radius: 8px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

h1 {
  color: #ce29aa;
}

p {
  color: #ccc;
}
</style>
