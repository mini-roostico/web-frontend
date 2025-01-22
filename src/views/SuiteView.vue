<template>
  <div class="suite-view container py-4">
    <h1 class="text-center mb-4">{{ suiteName }}</h1>
    <div class="row">
      <div class="col-md-6">
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item" @click="activeTabLeft = 'Suite Configuration'">
              <a class="nav-link" :class="{ active: activeTabLeft === 'Suite Configuration' }" href="#">
                Suite Configuration
              </a>
            </li>
            <li class="nav-item" @click="activeTabLeft = 'Suite YAML'">
              <a class="nav-link" :class="{ active: activeTabLeft === 'Suite YAML' }" href="#">
                Suite YAML
              </a>
            </li>
          </ul>
          <div v-show="activeTabLeft === 'Suite Configuration'">
            <p>Content for Tab 1 on the left side.</p>
          </div>
          <div v-show="activeTabLeft === 'Suite YAML'">
            <YamlEditor></YamlEditor>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item" @click="activeTabRight = 'Subjekt Output'">
              <a class="nav-link" :class="{ active: activeTabRight === 'Subjekt Output' }" href="#">
                Subjekt Output
              </a>
            </li>
            <li class="nav-item" @click="activeTabRight = 'Generation graph'">
              <a class="nav-link" :class="{ active: activeTabRight === 'Generation graph' }" href="#">
                Generation graph
              </a>
            </li>
          </ul>
          <div v-show="activeTabRight === 'tab1'">
            <p>Content for Tab 1 on the right side.</p>
          </div>
          <div v-show="activeTabRight === 'tab2'">
            <p>Content for Tab 2 on the right side.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import YamlEditor from "@/components/YamlEditor.vue";

export default defineComponent({
  name: 'SuiteView',
  components: {YamlEditor},
  setup() {
    const route = useRoute();
    const suiteName = ref(route.params.suiteName);
    const activeTabLeft = ref('Suite Configuration');
    const activeTabRight = ref('Subjekt Output');

    return {
      suiteName,
      activeTabLeft,
      activeTabRight
    };
  }
});
</script>

<style scoped>
.suite-view {
  background-color: #19191C;
  border-radius: 8px;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

.nav-tabs .nav-link {
  color: #CE29AA;
}

.nav-tabs .nav-link.active {
  background-color: #CE29AA;
  color: #fff;
}

.container {
  max-width: 100%;
  margin: 0 auto;
}
</style>
