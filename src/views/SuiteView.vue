<script setup lang="ts">
import { onMounted, Ref, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import YamlEditor from '@/components/YamlEditor.vue'
import SuiteForms from '@/components/SuiteForms.vue'
import GraphViewer from '@/components/GraphViewer.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSourceStore } from '@/stores/sources.ts'
import { useSuiteStore } from '@/stores/suite.ts'
import { GraphData } from '@/commons/graph.ts'
import SubjectResult from '@/components/SubjectResult.vue'
import AlertComponent from '@/components/AlertComponent.vue'
import { AlertType } from '@/commons/utils.ts'
import { ResolvedSubject, Source, Suite } from '@/commons/model.ts'

/**
 * Tab names for the left side of the page.
 */
type TabLeft = 'Suite Configuration' | 'Suite YAML'
/**
 * Tab names for the right side of the page.
 */
type TabRight = 'Subjekt Output' | 'Generation graph'

/**
 * Route of the page.
 */
const route = useRoute()
/**
 * Stores to handle authentication state.
 */
const authStore = useAuthStore()
/**
 * Stores to handle source state.
 */
const sourceStore = useSourceStore()
/**
 * Stores to handle suite generation.
 */
const suiteStore = useSuiteStore()

/**
 * Suite ID from the route.
 */
const suiteId: string | string[] = route.params.suiteId

/**
 * Source data loaded.
 */
const source: Ref<Source> = ref(null)

/**
 * Alert component reference.
 */
const alert: Ref<typeof AlertComponent> = ref(null)

/**
 * Shows an alert with the given text and type.
 * @param text Text to show in the alert.
 * @param type Type of the alert.
 */
function showAlert(text: string, type: string) {
  alert.value.show(text, type)
}

/**
 * Active tab on the left side of the page.
 */
const activeTabLeft: Ref<TabLeft> = ref('Suite Configuration')
/**
 * Active tab on the right side of the page.
 */
const activeTabRight: Ref<TabRight> = ref('Subjekt Output')
/**
 * Whether the page is loading or not.
 */
const loading: Ref<boolean> = ref(false)
/**
 * Whether the generation is done or not.
 */
const generationDone: Ref<boolean> = ref(false)
/**
 * YAML text of the suite.
 */
const yamlText: Ref<string> = ref('')
/**
 * Reference to the suite forms component.
 */
const suiteFormsRef: Ref<typeof SuiteForms> = ref(null)
/**
 * Whether the user is logged in or not.
 */
const isLogged: Ref<boolean> = ref(authStore.isLogged)
/**
 * Input value for the suite name.
 */
const suiteNameInput: Ref<string> = ref('')
/**
 * Whether the generation is loading or not.
 */
const generationLoading: Ref<boolean> = ref(false)
/**
 * Whether a critical error occurred or not.
 */
const criticalError: Ref<boolean> = ref(false)

/**
 * Graph data of the generation.
 */
const graphData: Ref<GraphData> = ref({ nodes: [], edges: [] })
/**
 * Result data of the generation.
 */
const resultData: Ref<ResolvedSubject[]> = ref([])

/**
 * Whether the suite local changes are saved or not.
 */
const isSaved: Ref<boolean> = ref(true)

/**
 * Previous text of the YAML before the modification.
 */
let previousText: string = null

onBeforeRouteLeave(() => {
  if (!isSaved.value) {
    const answer = window.confirm('You have unsaved changes. Do you really want to leave?')
    if (!answer) {
      return false
    }
  }
})

/**
 * Handles the key press event.
 */
function keyPressed() {
  isSaved.value = false
}

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
      showAlert('Error fetching suite. Please try again later.', AlertType.DANGER)
      criticalError.value = true
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
})

/**
 * Saves the Suite to the source store.
 * @param suite Suite to save.
 */
function saveYamlToStore(suite: Suite) {
  let error = true
  sourceStore
    .saveSource(source.value._id, suite)
    .then((source) => {
      if (source) {
        showAlert('Suite saved successfully!', AlertType.SUCCESS)
        isSaved.value = true
        error = false
      }
    })
    .catch((error) => {
      console.error('Error saving suite:', error)
    })
    .finally(() => {
      if (error) {
        showAlert('Error saving suite. Please try again later.', AlertType.DANGER)
      }
    })
}

/**
 * Saves the suite to the source store.
 */
function saveSuite() {
  const name = suiteNameInput.value
  if (activeTabLeft.value === 'Suite Configuration') {
    const suite: Suite = suiteFormsRef.value.getSuiteConfiguration(name)
    saveYamlToStore(suite)
  } else {
    const { suite } = suiteFormsRef.value.setFromYAML(yamlText.value)
    saveYamlToStore(suite)
  }
}

/**
 * Sets the forms parsing the YAML text.
 * @param yaml YAML text to set the forms from.
 * @returns Whether the operation was successful or not.
 */
function setFormsFromYaml(yaml: string): boolean {
  const result = suiteFormsRef.value.setFromYAML(yaml)
  if (result.success === false) {
    console.log(result.error)
    previousText = yaml
    showAlert(
      'There was an error parsing your YAML, please fix it before going back',
      AlertType.DANGER,
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
        yamlText.value = suiteFormsRef.value.generateYAML(suiteNameInput.value).yaml
      } else {
        yamlText.value = previousText
        previousText = undefined
      }
      break
    }
  }
})

/**
 * Runs the suite generation. Shows an alert if there is an error, otherwise sets the result data
 * and the generation graph.
 */
function runGeneration() {
  generationLoading.value = true
  if (activeTabLeft.value === 'Suite YAML') {
    const { success, error } = suiteFormsRef.value.setFromYAML(yamlText.value)
    if (!success) {
      showAlert(`Error parsing YAML: ${error}`, AlertType.DANGER)
      generationLoading.value = false
      return
    }
  }
  const generationSuite = suiteFormsRef.value.getSuiteConfiguration(suiteNameInput.value)

  suiteStore
    .generate(generationSuite)
    .then((data) => {
      const { resolvedSubjects, generationGraph } = data
      generationDone.value = true
      generationLoading.value = false
      graphData.value = generationGraph
      resultData.value = []
      resolvedSubjects.forEach((subject) => {
        resultData.value.push(subject)
      })
      alert.value.clear()
    })
    .catch((error) => {
      console.error('Error generating suite:', error)
      showAlert(`Error generating suite: ${error}`, AlertType.DANGER)
      generationLoading.value = false
    })
}

/**
 * Downloads the result data as a JSON file.
 */
function downloadResultData() {
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resultData.value, null, 2))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', `${suiteNameInput.value}_result.json`)
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
</script>
<template>
  <!-- AlertComponent Component -->
  <AlertComponent ref="alert" />
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
          @keyup="keyPressed"
        />
        <button
          v-if="!isSaved"
          class="btn btn-outline-secondary"
          :disabled="loading"
          @click="saveSuite"
        >
          <i class="bi bi-save me-1"></i>Save
        </button>
      </div>
      <div class="d-flex align-items-center">
        <button
          v-if="!generationLoading"
          class="btn play-btn me-2"
          :disabled="loading"
          @click="runGeneration"
        >
          <i class="bi bi-play-fill"></i> Run Suite
        </button>
        <div v-else class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <button v-if="generationDone" class="btn btn-outline-secondary" @click="downloadResultData">
          <i class="bi bi-download me-1"></i>Download JSON
        </button>
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
              <SuiteForms
                ref="suiteFormsRef"
                :disabled="loading"
                @keyup="keyPressed"
                @button-pressed="isSaved = false"
              ></SuiteForms>
            </div>
            <div v-show="activeTabLeft === 'Suite YAML'" class="tab-pane fade show active">
              <YamlEditor v-model="yamlText" @keyup="keyPressed"></YamlEditor>
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
              <div v-if="generationDone">
                <SubjectResult
                  v-for="result in resultData"
                  :key="result.name + result.values.join('')"
                  :result="result"
                >
                </SubjectResult>
              </div>
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
