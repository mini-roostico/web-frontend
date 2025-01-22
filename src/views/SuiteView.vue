<template>
  <div class="suite-view container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="m-0">{{ suiteName }}</h1>
      <!-- Play button that's always visible -->
      <button class="btn play-btn">
        <i class="bi bi-play-fill"></i> Run Suite
      </button>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="tabs-container">
          <ul class="nav nav-tabs custom-tabs">
            <li class="nav-item" @click="activeTabLeft = 'Suite Configuration'">
              <a class="nav-link" :class="{ active: activeTabLeft === 'Suite Configuration' }" href="#">
                <i class="bi bi-gear-fill me-2"></i>Suite Configuration
              </a>
            </li>
            <li class="nav-item" @click="activeTabLeft = 'Suite YAML'">
              <a class="nav-link" :class="{ active: activeTabLeft === 'Suite YAML' }" href="#">
                <i class="bi bi-code-slash me-2"></i>Suite YAML
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="activeTabLeft === 'Suite Configuration'" class="tab-pane fade show active">
              <SuiteForms></SuiteForms>
            </div>
            <div v-show="activeTabLeft === 'Suite YAML'" class="tab-pane fade show active">
              <YamlEditor></YamlEditor>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="tabs-container">
          <ul class="nav nav-tabs custom-tabs">
            <li class="nav-item" @click="activeTabRight = 'Subjekt Output'">
              <a class="nav-link" :class="{ active: activeTabRight === 'Subjekt Output' }" href="#">
                <i class="bi bi-terminal-fill me-2"></i>Subjekt Output
              </a>
            </li>
            <li class="nav-item" @click="activeTabRight = 'Generation graph'">
              <a class="nav-link" :class="{ active: activeTabRight === 'Generation graph' }" href="#">
                <i class="bi bi-graph-up me-2"></i>Generation Graph
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="activeTabRight === 'Subjekt Output'" class="tab-pane fade show active">
              <p>Content for Subjekt Output.</p>
            </div>
            <div v-show="activeTabRight === 'Generation graph'" class="tab-pane fade show active">

            </div>
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
import SuiteForms from "@/components/SuiteForms.vue";

export default defineComponent({
  name: 'SuiteView',
  components: {SuiteForms, YamlEditor},
  setup() {
    const route = useRoute();
    const suiteName = ref(route.params.suiteId);
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

.container {
  max-width: 100%;
  margin: 0 auto;
}

.tabs-container {
  background-color: #242427;
  border-radius: 8px;
  overflow: hidden;
}

.custom-tabs {
  background-color: #2d2d31;
  padding: 0.5rem 0.5rem 0;
  border-bottom: none;
  gap: 0.5rem;
}

.nav-tabs .nav-link {
  color: #8b8b8b;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px 8px 0 0;
  transition: all 0.2s ease;
  background-color: #242427;
  font-weight: 500;
}

.nav-tabs .nav-link:hover {
  color: #CE29AA;
  background-color: #2d2d31;
}

.nav-tabs .nav-link.active {
  background-color: #CE29AA;
  color: #fff;
  border: none;
}

.tab-content {
  padding: 1.5rem;
  background-color: #242427;
}

/* Play button styling */
.play-btn {
  background-color: #CE29AA;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.play-btn:hover {
  background-color: #d93eb6;
  color: white;
  transform: translateY(-1px);
}

.play-btn .bi {
  font-size: 1.2rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
}
</style>
