<script setup>
import {inject, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import YamlEditor from "@/components/YamlEditor.vue";
import SuiteForms from "@/components/SuiteForms.vue";
import GraphViewer from "@/components/GraphViewer.vue";
import {AuthService} from "@/scripts/AuthService.js";

// TODO
const initialYaml = `---
name: ''
configuration: {}
parameters: []
macros: []
subjects: []
`

const route = useRoute();
const suiteName = ref(route.params.suiteId);
const activeTabLeft = ref('Suite Configuration');
const activeTabRight = ref('Subjekt Output');
const loading = ref(false);
const generationDone = ref(false);
const yamlText = ref(initialYaml);
const suiteFormsRef = ref(null);
const alertText = ref('');
const alertType = ref('alert-info');

let previousText = undefined;

const showAlert = (text, type = 'alert-info') => {
  alertText.value = text;
  alertType.value = type;
};

const clearAlert = () => {
  alertText.value = '';
};

const saveSuite = () => {
  // TODO Implement save logic
  showAlert('Suite saved successfully!', 'alert-success');
};


const position = {x: 0, y: 0}

watch(activeTabLeft, (newTab) => {
  if (newTab === 'Suite YAML') {
    if (!previousText) {
      yamlText.value = suiteFormsRef.value.generateYAML().yaml;
    } else {
      yamlText.value = previousText
      previousText = undefined;
    }
  } else if (newTab === 'Suite Configuration') {
    let result = suiteFormsRef.value.setFromYAML(yamlText.value);
    if (result.success === false) {
      console.log(result.error);
      previousText = yamlText.value;
      showAlert(
        "There was an error parsing your YAML, please fix it before going back",
        'alert-danger'
      );
      activeTabLeft.value = 'Suite YAML';
    }
  }
})

function runRegeneration() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    generationDone.value = true;
  }, 2000);
}

const initialNodes = [
  {
    id: 'root',
    position,
    data: {
      label: 'Root',
    },
  },
  {
    id: 's1',
    position,
    data: {
      label: 'Subject 1',
    },
  },
  {
    id: 's2',
    position,
    data: {
      label: 'Subject 2',
    },
  },
  {
    id: 'rs1',
    position,
    data: {
      label: 'Resolved Subject 1',
    },
  },
]

const initialEdges = [
  {id: 'root-s1', source: 'root', target: 's1'},
  {id: 'root-s2', source: 'root', target: 's2'},
  {id: 's1-rs1', source: 's1', target: 'rs1'},
]

const graphData = {
  nodes: initialNodes,
  edges: initialEdges,
}

const isLogged = ref(AuthService.isAuthenticated());

</script>
<template>
  <div class="suite-view container py-4" v-if="isLogged">
    <!-- Alert Component -->
    <div
      v-if="alertText"
      class="alert alert-dismissible alert-dark fade show"
      :class="alertType"
      role="alert"
    >
      {{ alertText }}
      <button
        type="button"
        class="btn-close"
        @click="clearAlert"
        aria-label="Close"
      ></button>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <input
          v-model="suiteName"
          class="form-control form-control dark-input me-2"
          placeholder="Enter Suite Name"
        />
        <button class="btn btn-outline-secondary" @click="saveSuite">
          <i class="bi bi-save me-1"></i>Save
        </button>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn play-btn me-2" @click="runRegeneration">
          <i class="bi bi-play-fill"></i> Run Suite
        </button>
        <div
          class="spinner-border"
          role="status"
          :style="{ visibility: loading ? 'visible' : 'hidden' }"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="tabs-container">
          <ul class="nav nav-tabs custom-tabs">
            <li class="nav-item" @click="activeTabLeft = 'Suite Configuration'">
              <a class="nav-link" :class="{ active: activeTabLeft === 'Suite Configuration' }"
                 href="#">
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
              <SuiteForms ref="suiteFormsRef"></SuiteForms>
            </div>
            <div v-show="activeTabLeft === 'Suite YAML'" class="tab-pane fade show active">
              <YamlEditor v-model="yamlText"></YamlEditor>
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
              <a class="nav-link" :class="{ active: activeTabRight === 'Generation graph' }"
                 href="#">
                <i class="bi bi-graph-up me-2"></i>Generation Graph
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="activeTabRight === 'Subjekt Output'" class="tab-pane fade show active">
              <p v-if="generationDone">Result</p>
              <p v-else>Run the generation to produce an output.</p>
            </div>
            <div v-show="activeTabRight === 'Generation graph'" class="tab-pane fade show active">
              <GraphViewer v-model="graphData" v-if="generationDone"></GraphViewer>
              <p v-else>Run the generation to produce an output.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-white text-center mt-5">Please log in to view this page.</p>
  </div>
</template>
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

.dark-input {
  background-color: #2d2d31;
  border-color: #3a3a3e;
  color: #e1e1e1;
}

.dark-input:focus {
  background-color: #2d2d31;
  border-color: #4a4a4e;
  color: #e1e1e1;
  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.15);
}

.dark-input::placeholder {
  color: #8b8b8b;
}

.dark-input:disabled {
  background-color: #1e1e21;
  color: #666;
}
</style>
