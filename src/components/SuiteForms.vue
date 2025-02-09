<script setup lang="ts">
import { ref } from 'vue'
import {
  Configuration,
  getYamlFromSuite,
  Macro,
  Parameter,
  Subject,
  SubjektConfig,
  Suite,
} from '@/commons/model.ts'
import yaml from 'js-yaml'

/**
 * Defines the props of the component. The `disabled` prop is used to disable the form.
 */
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

/**
 * Emits for when a button is pressed in form: `buttonPressed`.
 */
const emit = defineEmits(['buttonPressed'])

/**
 * The configuration of the suite.
 */
const configuration = ref([])
/**
 * The parameters of the suite.
 */
const parameters = ref([])
/**
 * The macros of the suite.
 */
const macros = ref([])
/**
 * The subjects of the suite. Starts with one empty subject.
 */
const subjects = ref([{ name: 'Subject 1', pairs: [] }])

/**
 * Extracts the suite configuration from the form values.
 * @param suiteName The name of the suite.
 */
function getSuiteConfiguration(suiteName: string): Suite {
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

  return {
    name: suiteName,
    configuration: configObj,
    parameters: parametersArray,
    macros: macrosArray,
    subjects: subjectsArray,
  }
}

/**
 * Generates a YAML string from the current form values.
 * @param suiteName The name of the suite, contained in a separate form.
 * @returns The YAML string and the suite object wrapped in a SubjektConfig object.
 */
function generateYAML(suiteName: string): SubjektConfig {
  const { configuration, parameters, macros, subjects } = getSuiteConfiguration(suiteName)
  return getYamlFromSuite(suiteName, configuration, parameters, macros, subjects)
}

/**
 * Sets the form values from a YAML string.
 * @param yamlString The YAML string to parse.
 * @returns An object with the success status, the suite name if successful, and the error message if not.
 */
function setFromYAML(yamlString: string): {
  success: boolean
  suiteName?: string
  error?: string
  suite?: Suite
} {
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

    return { success: true, suiteName: suite.name, suite }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

defineExpose({
  generateYAML,
  setFromYAML,
  getSuiteConfiguration,
})

/**
 * Adds a new empty key-value pair to the configuration.
 */
function addConfigPair() {
  configuration.value.push({ key: '', value: '' })
  emit('buttonPressed')
}

/**
 * Removes a key-value pair from the configuration.
 * @param index The index of the pair to remove.
 */
function removeConfigPair(index: number) {
  configuration.value.splice(index, 1)
  emit('buttonPressed')
}

/**
 * Adds a new empty parameter to the suite.
 */
function addParameter() {
  parameters.value.push({
    name: '',
    values: [],
  })
  emit('buttonPressed')
}

/**
 * Adds a new value to a parameter.
 * @param paramIndex The index of the parameter to add the value to.
 */
function addParameterValue(paramIndex: number) {
  parameters.value[paramIndex].values.push('')
  emit('buttonPressed')
}

/**
 * Removes a parameter from the suite.
 * @param index The index of the parameter to remove.
 */
function removeParameter(index: number) {
  parameters.value.splice(index, 1)
  emit('buttonPressed')
}

/**
 * Removes a value from a parameter.
 * @param paramIndex The index of the parameter.
 * @param valueIndex The index of the value to remove.
 */
function removeParameterValue(paramIndex: number, valueIndex: number) {
  parameters.value[paramIndex].values.splice(valueIndex, 1)
  emit('buttonPressed')
}

/**
 * Adds a new empty macro to the suite.
 */
function addMacro() {
  macros.value.push({
    name: '',
    values: [],
  })
  emit('buttonPressed')
}

/**
 * Adds a new value to a macro.
 * @param macroIndex The index of the macro to add the value to.
 */
function addMacroValue(macroIndex: number) {
  macros.value[macroIndex].values.push('')
  emit('buttonPressed')
}

/**
 * Removes a macro from the suite.
 * @param index The index of the macro to remove.
 */
function removeMacro(index: number) {
  macros.value.splice(index, 1)
  emit('buttonPressed')
}

/**
 * Removes a value from a macro.
 * @param macroIndex The index of the macro.
 * @param valueIndex The index of the value to remove.
 */
function removeMacroValue(macroIndex: number, valueIndex: number) {
  macros.value[macroIndex].values.splice(valueIndex, 1)
  emit('buttonPressed')
}

/**
 * Adds a new empty subject to the suite.
 */
function addSubject() {
  subjects.value.push({
    name: `Subject ${subjects.value.length + 1}`,
    pairs: [],
  })
  emit('buttonPressed')
}

/**
 * Removes a subject from the suite.
 * @param index The index of the subject to remove.
 */
function removeSubject(index: number) {
  subjects.value.splice(index, 1)
  emit('buttonPressed')
}

/**
 * Adds a new key-value pair to a subject.
 * @param subjectIndex The index of the subject to add the pair to.
 */
function addSubjectPair(subjectIndex: number) {
  subjects.value[subjectIndex].pairs.push({ key: '', value: '' })
  emit('buttonPressed')
}

/**
 * Removes a key-value pair from a subject.
 * @param subjectIndex The index of the subject.
 * @param pairIndex The index of the pair to remove.
 */
function removeSubjectPair(subjectIndex: number, pairIndex: number) {
  subjects.value[subjectIndex].pairs.splice(pairIndex, 1)
  emit('buttonPressed')
}
</script>

<template>
  <div class="container mt-4">
    <!-- Configuration -->
    <div class="card dark-card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Configuration</h5>
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="$props.disabled"
          @click="addConfigPair"
        >
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
              :disabled="$props.disabled"
            />
          </div>
          <div class="col-5">
            <input
              v-model="pair.value"
              type="text"
              class="form-control dark-input"
              placeholder="Value"
              :disabled="$props.disabled"
            />
          </div>
          <div class="col-2">
            <button
              class="btn btn-outline-danger btn-sm"
              :disabled="$props.disabled"
              @click="removeConfigPair(index)"
            >
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
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="$props.disabled"
          @click="addParameter"
        >
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
              :disabled="$props.disabled"
            />
            <div>
              <button
                class="btn btn-outline-success btn-sm me-2"
                :disabled="$props.disabled"
                @click="addParameterValue(paramIndex)"
              >
                <i class="bi bi-plus-lg"></i> Add Value
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                :disabled="$props.disabled"
                @click="removeParameter(paramIndex)"
              >
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
                :disabled="$props.disabled"
              />
            </div>
            <div class="col-2">
              <button
                class="btn btn-outline-danger btn-sm"
                :disabled="$props.disabled"
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
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="$props.disabled"
          @click="addMacro"
        >
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
              :disabled="$props.disabled"
            />
            <div>
              <button
                class="btn btn-outline-success btn-sm me-2"
                :disabled="$props.disabled"
                @click="addMacroValue(macroIndex)"
              >
                <i class="bi bi-plus-lg"></i> Add Value
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                :disabled="$props.disabled"
                @click="removeMacro(macroIndex)"
              >
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
                :disabled="$props.disabled"
              ></textarea>
            </div>
            <div class="col-2">
              <button
                class="btn btn-outline-danger btn-sm"
                :disabled="$props.disabled"
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
                <div class="row m-1">
                  <input
                    v-model="pair.key"
                    type="text"
                    class="form-control dark-input"
                    placeholder="Key"
                  />
                </div>
                <div class="row m-1">
                  <textarea
                    v-model="pair.value"
                    rows="3"
                    class="form-control dark-input"
                    placeholder="Value"
                  ></textarea>
                </div>
                <div class="mt-1">
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
