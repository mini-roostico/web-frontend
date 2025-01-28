<script setup lang="ts">
import { ref } from 'vue'
import yaml from 'js-yaml'

const configuration = ref([])
const parameters = ref([])
const macros = ref([])
const subjects = ref([{ name: 'Subject 1', pairs: [] }])

interface Configuration {
  pairs: { key: string; value: string }[]
}

interface Parameter {
  name: string
  values: string[]
}

interface Macro {
  name: string
  values: string[]
}

interface Subject {
  name: string
  pairs: { key: string; value: string }[]
}

interface Suite {
  name: string
  configuration: Configuration
  parameters: Parameter[]
  macros: Macro[]
  subjects: Subject[]
}

interface SubjektConfig {
  yaml: string
  suite: Suite
}

// to generate YAML from the forms
function generateYAML(suiteName: string): SubjektConfig {
  const configObj: Configuration = configuration.value.reduce((acc, item) => {
    if (item.key && item.value) {
      acc[item.key] = item.value
    }
    return acc
  }, {})

  const parametersArray: Parameter[] = parameters.value
    .map((param) => ({
      name: param.name,
      values: param.values.filter((v) => v.trim() !== ''),
    }))
    .filter((param) => param.name && param.values.length > 0)

  const macrosArray: Macro[] = macros.value
    .map((macro) => ({
      name: macro.name,
      values: macro.values.filter((v) => v.trim() !== ''),
    }))
    .filter((macro) => macro.name && macro.values.length > 0)

  const subjectsArray: Subject[] = subjects.value
    .map((subject) =>
      subject.pairs.reduce((acc, pair) => {
        if (pair.key && pair.value) {
          acc[pair.key] = pair.value
        }
        return acc
      }, {}),
    )
    .filter((subject) => Object.keys(subject).length > 0)

  const suite = {
    name: suiteName,
    configuration: configObj,
    parameters: parametersArray,
    macros: macrosArray,
    subjects: subjectsArray,
  }

  return {
    yaml: yaml.dump(suite, {
      skipInvalid: true,
      // Ensure multi-line strings are properly formatted
      forceQuotes: true,
    }),
    suite: suite,
  }
}

function setFromYAML(yamlString: string): { success: boolean; suiteName?: string; error?: string } {
  try {
    const suite: Suite = yaml.load(yamlString) as Suite

    // Configuration
    configuration.value = Object.entries(suite.configuration || {}).map(([key, value]) => ({
      key,
      value,
    }))

    // Parameters
    parameters.value = (suite.parameters || []).map((param) => ({
      name: param.name,
      values: param.values || [],
    }))

    // Macros
    macros.value = (suite.macros || []).map((macro) => ({
      name: macro.name,
      values: macro.values || [],
    }))

    // Subjects
    subjects.value = (suite.subjects || []).map((subject) => ({
      name: `Subject ${subjects.value.length + 1}`,
      pairs: Object.entries(subject).map(([key, value]) => ({
        key,
        value,
      })),
    }))

    return { success: true, suiteName: suite.name }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

// Expose both methods
defineExpose({
  generateYAML,
  setFromYAML,
})

function addConfigPair() {
  configuration.value.push({ key: '', value: '' })
}

function removeConfigPair(index: number) {
  configuration.value.splice(index, 1)
}

function addParameter() {
  parameters.value.push({
    name: '',
    values: [],
  })
}

function addParameterValue(paramIndex: number) {
  parameters.value[paramIndex].values.push('')
}

function removeParameter(index: number) {
  parameters.value.splice(index, 1)
}

function removeParameterValue(paramIndex: number, valueIndex: number) {
  parameters.value[paramIndex].values.splice(valueIndex, 1)
}

function addMacro() {
  macros.value.push({
    name: '',
    values: [],
  })
}

function addMacroValue(macroIndex: number) {
  macros.value[macroIndex].values.push('')
}

function removeMacro(index: number) {
  macros.value.splice(index, 1)
}

function removeMacroValue(macroIndex: number, valueIndex: number) {
  macros.value[macroIndex].values.splice(valueIndex, 1)
}

function addSubject() {
  subjects.value.push({
    name: `Subject ${subjects.value.length + 1}`,
    pairs: [],
  })
}

function removeSubject(index: number) {
  subjects.value.splice(index, 1)
}

function addSubjectPair(subjectIndex: number) {
  subjects.value[subjectIndex].pairs.push({ key: '', value: '' })
}

function removeSubjectPair(subjectIndex: number, pairIndex: number) {
  subjects.value[subjectIndex].pairs.splice(pairIndex, 1)
}
</script>

<template>
  <div class="container mt-4">
    <!-- Configuration -->
    <div class="card dark-card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Configuration</h5>
        <button class="btn btn-outline-primary btn-sm" @click="addConfigPair">
          <i class="bi bi-plus-lg"></i> Add Key-Value Pair
        </button>
      </div>
      <div class="card-body">
        <div v-for="(pair, index) in configuration" :key="index" class="row mb-2">
          <div class="col-5">
            <input
              v-model="pair.key"
              type="text"
              class="form-control dark-input"
              placeholder="Key"
            />
          </div>
          <div class="col-5">
            <input
              v-model="pair.value"
              type="text"
              class="form-control dark-input"
              placeholder="Value"
            />
          </div>
          <div class="col-2">
            <button class="btn btn-outline-danger btn-sm" @click="removeConfigPair(index)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Parameters -->
    <div class="card dark-card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Parameters</h5>
        <button class="btn btn-outline-primary btn-sm" @click="addParameter">
          <i class="bi bi-plus-lg"></i> Add Parameter
        </button>
      </div>
      <div class="card-body">
        <div v-for="(param, paramIndex) in parameters" :key="paramIndex" class="mb-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <input
              v-model="param.name"
              type="text"
              class="form-control dark-input w-75"
              placeholder="Parameter name"
            />
            <div>
              <button
                class="btn btn-outline-success btn-sm me-2"
                @click="addParameterValue(paramIndex)"
              >
                <i class="bi bi-plus-lg"></i> Add Value
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="removeParameter(paramIndex)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div v-for="(value, valueIndex) in param.values" :key="valueIndex" class="row mb-2">
            <div class="col-10">
              <input
                v-model="param.values[valueIndex]"
                type="text"
                class="form-control dark-input"
                placeholder="Value"
              />
            </div>
            <div class="col-2">
              <button
                class="btn btn-outline-danger btn-sm"
                @click="removeParameterValue(paramIndex, valueIndex)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Macros -->
    <div class="card dark-card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Macros</h5>
        <button class="btn btn-outline-primary btn-sm" @click="addMacro">
          <i class="bi bi-plus-lg"></i> Add Macro
        </button>
      </div>
      <div class="card-body">
        <div v-for="(macro, macroIndex) in macros" :key="macroIndex" class="mb-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <input
              v-model="macro.name"
              type="text"
              class="form-control dark-input w-75"
              placeholder="Macro name"
            />
            <div>
              <button
                class="btn btn-outline-success btn-sm me-2"
                @click="addMacroValue(macroIndex)"
              >
                <i class="bi bi-plus-lg"></i> Add Value
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="removeMacro(macroIndex)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div v-for="(value, valueIndex) in macro.values" :key="valueIndex" class="row mb-2">
            <div class="col-10">
              <textarea
                v-model="macro.values[valueIndex]"
                class="form-control dark-input"
                rows="3"
                placeholder="Value"
              ></textarea>
            </div>
            <div class="col-2">
              <button
                class="btn btn-outline-danger btn-sm"
                @click="removeMacroValue(macroIndex, valueIndex)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Subjects -->
    <div class="card dark-card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Subjects</h5>
        <button class="btn btn-outline-primary btn-sm" @click="addSubject">
          <i class="bi bi-plus-lg"></i> Add Subject
        </button>
      </div>
      <div class="card-body">
        <div v-for="(subject, subjectIndex) in subjects" :key="subjectIndex" class="mb-4">
          <div class="card dark-card">
            <div class="card-header bg-dark d-flex justify-content-between align-items-center">
              <input
                v-model="subject.name"
                type="text"
                class="form-control dark-input w-75"
                :placeholder="`Subject ${subjectIndex + 1}`"
                disabled
              />
              <div>
                <button
                  class="btn btn-outline-success btn-sm me-2"
                  @click="addSubjectPair(subjectIndex)"
                >
                  <i class="bi bi-plus-lg"></i> Add Pair
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="removeSubject(subjectIndex)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div v-for="(pair, pairIndex) in subject.pairs" :key="pairIndex" class="row mb-2">
                <div class="col-5">
                  <input
                    v-model="pair.key"
                    type="text"
                    class="form-control dark-input"
                    placeholder="Key"
                  />
                </div>
                <div class="col-5">
                  <input
                    v-model="pair.value"
                    type="text"
                    class="form-control dark-input"
                    placeholder="Value"
                  />
                </div>
                <div class="col-2">
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="removeSubjectPair(subjectIndex, pairIndex)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.form-control {
  border-radius: 0.375rem;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}
</style>
