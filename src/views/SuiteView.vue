<script setup lang="ts">
import { onMounted, Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import YamlEditor from '@/components/YamlEditor.vue'
import SuiteForms from '@/components/SuiteForms.vue'
import GraphViewer from '@/components/GraphViewer.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { Source, useSourceStore } from '@/stores/sources.ts'
import { useSuiteStore } from '@/stores/suite.ts'
import { GraphData } from '@/scripts/graph.ts'

type AlertType = 'alert-info' | 'alert-danger' | 'alert-success'
type TabLeft = 'Suite Configuration' | 'Suite YAML'
type TabRight = 'Subjekt Output' | 'Generation graph'

const route = useRoute()
const authStore = useAuthStore()
const sourceStore = useSourceStore()
const suiteStore = useSuiteStore()

const suiteId: string | string[] = route.params.suiteId

const source: Ref<Source> = ref(null)

const activeTabLeft: Ref<TabLeft> = ref('Suite Configuration')
const activeTabRight: Ref<TabRight> = ref('Subjekt Output')
const loading: Ref<boolean> = ref(false)
const generationDone: Ref<boolean> = ref(false)
const yamlText: Ref<string> = ref('')
const suiteFormsRef = ref(null)
const alertText: Ref<string> = ref('')
const alertType: Ref<AlertType> = ref('alert-info')
const isLogged: Ref<boolean> = ref(authStore.isLogged)
const suiteNameInput: Ref<string> = ref('')
const generationLoading: Ref<boolean> = ref(false)
const criticalError: Ref<boolean> = ref(false)
const graphData: Ref<GraphData> = ref({ nodes: [], edges: [] })

let previousText: string = null

onMounted(() => {
  loading.value = true
  sourceStore
    .getSource(suiteId as string)
    .then(async (data) => {
      source.value = data
      yamlText.value = data.yaml
      setFormsFromYaml(data.yaml)
    })
    .catch((error) => {
      showAlert('Error fetching suite. Please try again later.', 'alert-danger')
      criticalError.value = true
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
})

function showAlert(text: string, type: AlertType = 'alert-info') {
  alertText.value = text
  alertType.value = type
}

function clearAlert() {
  alertText.value = ''
}

function saveYamlToStore(name: string, yaml: string) {
  sourceStore
    .saveSource(source.value.id, name, yaml)
    .then((source) => {
      showAlert('Suite saved successfully!', 'alert-success')
      console.log(source.yaml)
      setFormsFromYaml(source.yaml)
    })
    .catch((error) => {
      console.error('Error saving suite:', error)
      showAlert('Error saving suite. Please try again later.', 'alert-danger')
    })
}

function saveSuite() {
  const name = suiteNameInput.value
  if (activeTabLeft.value === 'Suite Configuration') {
    const { yaml } = suiteFormsRef.value.generateYAML(name)
    saveYamlToStore(name, yaml)
  } else {
    if (setFormsFromYaml(yamlText.value) === true) {
      saveYamlToStore(name, yamlText.value)
    }
  }
}

function setFormsFromYaml(yaml: string): boolean {
  const result = suiteFormsRef.value.setFromYAML(yaml)
  if (result.success === false) {
    console.log(result.error)
    previousText = yaml
    showAlert(
      'There was an error parsing your YAML, please fix it before going back',
      'alert-danger',
    )
    activeTabLeft.value = 'Suite YAML'
  } else {
    suiteNameInput.value = result.suiteName
  }
  return result.success
}

watch(activeTabLeft, (newTab) => {
  switch (newTab) {
    case 'Suite Configuration': {
      setFormsFromYaml(yamlText.value)
      break
    }
    case 'Suite YAML': {
      if (!previousText) {
        console.log(suiteFormsRef.value.generateYAML(suiteNameInput.value).yaml)
        yamlText.value = suiteFormsRef.value.generateYAML(suiteNameInput.value).yaml
      } else {
        yamlText.value = previousText
        previousText = undefined
      }
      break
    }
  }
})

function runRegeneration() {
  generationLoading.value = true
  if (activeTabLeft.value === 'Suite Configuration') {
    yamlText.value = suiteFormsRef.value.generateYAML(suiteNameInput.value).yaml
  }
  suiteStore
    .generate(yamlText.value)
    .then((data) => {
      const { result, generationGraph } = data
      console.log(result)
      generationDone.value = true
      generationLoading.value = false
      graphData.value = generationGraph
      // TODO show result
    })
    .catch((error) => {
      console.error('Error generating suite:', error)
      showAlert(`Error generating suite: ${error}`, 'alert-danger')
      generationLoading.value = false
    })
}
</script>
<template>
  <!-- Alert Component -->
  <div
    v-if="alertText"
    class="alert alert-dismissible alert-dark fade show m-4"
    :class="alertType"
    role="alert"
  >
    {{ alertText }}
    <button type="button" class="btn-close" aria-label="Close" @click="clearAlert"></button>
  </div>
  <div v-if="loading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="isLogged && !criticalError" class="suite-view container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <input
          v-model="suiteNameInput"
          class="form-control form-control dark-input me-2"
          placeholder="Enter Suite Name"
          :disabled="loading"
        />
        <button class="btn btn-outline-secondary" :disabled="loading" @click="saveSuite">
          <i class="bi bi-save me-1"></i>Save
        </button>
      </div>
      <div class="d-flex align-items-center">
        <button
          v-if="!generationLoading"
          class="btn play-btn me-2"
          :disabled="loading"
          @click="runRegeneration"
        >
          <i class="bi bi-play-fill"></i> Run Suite
        </button>
        <div v-else class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="tabs-container">
          <ul class="nav nav-tabs custom-tabs">
            <li class="nav-item" @click="activeTabLeft = 'Suite Configuration'">
              <a
                class="nav-link"
                :class="{ active: activeTabLeft === 'Suite Configuration' }"
                href="#"
              >
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
              <SuiteForms ref="suiteFormsRef" :disabled="loading"></SuiteForms>
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
              <a
                class="nav-link"
                :class="{ active: activeTabRight === 'Generation graph' }"
                href="#"
              >
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
              <GraphViewer v-if="generationDone" v-model="graphData"></GraphViewer>
              <p v-else>Run the generation to produce an output.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!criticalError">
    <p class="text-white text-center mt-5">Please log in to view this page.</p>
  </div>
</template>
<style scoped>
.suite-view {
  background-color: #19191c;
  border-radius: 8px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
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
  color: #ce29aa;
  background-color: #2d2d31;
}

.nav-tabs .nav-link.active {
  background-color: #ce29aa;
  color: #fff;
  border: none;
}

.tab-content {
  padding: 1.5rem;
  background-color: #242427;
}

/* Play button styling */
.play-btn {
  background-color: #ce29aa;
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
