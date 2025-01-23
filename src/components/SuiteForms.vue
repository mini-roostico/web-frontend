<script setup>
import {ref, reactive, computed} from 'vue';
import yaml from "js-yaml";

const configuration = ref([]);
const parameters = ref([]);
const macros = ref([]);
const subjects = ref([{name: 'Subject 1', pairs: []}]);

// to generate YAML from the forms
const generateYAML = computed(() => {
  const configObj = configuration.value.reduce((acc, item) => {
    if (item.key && item.value) {
      acc[item.key] = item.value;
    }
    return acc;
  }, {});

  const parametersArray = parameters.value.map(param => ({
    name: param.name,
    values: param.values.filter(v => v.trim() !== '')
  })).filter(param => param.name && param.values.length > 0);

  const macrosArray = macros.value.map(macro => ({
    name: macro.name,
    values: macro.values.filter(v => v.trim() !== '')
  })).filter(macro => macro.name && macro.values.length > 0);

  const subjectsArray = subjects.value.map(subject =>
    subject.pairs.reduce((acc, pair) => {
      if (pair.key && pair.value) {
        acc[pair.key] = pair.value;
      }
      return acc;
    }, {})
  ).filter(subject => Object.keys(subject).length > 0);

  const yamlObject = {
    configuration: configObj,
    parameters: parametersArray,
    macros: macrosArray,
    subjects: subjectsArray
  };

  return {
    yaml: yaml.dump(yamlObject, {
      skipInvalid: true,
      // Ensure multi-line strings are properly formatted
      forceQuotes: true
    }),
    object: yamlObject
  }
});

const setFromYAML = (yamlString) => {
  try {
    // Parse the YAML
    const parsedObject = yaml.load(yamlString);

    // Configuration
    configuration.value = Object.entries(parsedObject.configuration || {}).map(([key, value]) => ({
      key,
      value
    }));

    // Parameters
    parameters.value = (parsedObject.parameters || []).map(param => ({
      name: param.name,
      values: param.values || []
    }));

    // Macros
    macros.value = (parsedObject.macros || []).map(macro => ({
      name: macro.name,
      values: macro.values || []
    }));

    // Subjects
    subjects.value = (parsedObject.subjects || []).map(subject => ({
      name: `Subject ${subjects.value.length + 1}`,
      pairs: Object.entries(subject).map(([key, value]) => ({
        key,
        value
      }))
    }));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Expose both methods
defineExpose({
  generateYAML: () => generateYAML.value,
  setFromYAML
});

const addConfigPair = () => {
  configuration.value.push({key: '', value: ''});
};

const removeConfigPair = (index) => {
  configuration.value.splice(index, 1);
};

const addParameter = () => {
  parameters.value.push({
    name: '',
    values: []
  });
};

const addParameterValue = (paramIndex) => {
  parameters.value[paramIndex].values.push('');
};

const removeParameter = (index) => {
  parameters.value.splice(index, 1);
};

const removeParameterValue = (paramIndex, valueIndex) => {
  parameters.value[paramIndex].values.splice(valueIndex, 1);
};

const addMacro = () => {
  macros.value.push({
    name: '',
    values: []
  });
};

const addMacroValue = (macroIndex) => {
  macros.value[macroIndex].values.push('');
};

const removeMacro = (index) => {
  macros.value.splice(index, 1);
};

const removeMacroValue = (macroIndex, valueIndex) => {
  macros.value[macroIndex].values.splice(valueIndex, 1);
};

const addSubject = () => {
  subjects.value.push({
    name: `Subject ${subjects.value.length + 1}`,
    pairs: []
  });
};

const removeSubject = (index) => {
  subjects.value.splice(index, 1);
};

const addSubjectPair = (subjectIndex) => {
  subjects.value[subjectIndex].pairs.push({key: '', value: ''});
};

const removeSubjectPair = (subjectIndex, pairIndex) => {
  subjects.value[subjectIndex].pairs.splice(pairIndex, 1);
};
</script>

<template>
  <div class="container mt-4">
    <!-- Configuration -->
    <div class="card dark-card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Configuration</h5>
        <button @click="addConfigPair" class="btn btn-outline-primary btn-sm">
          <i class="bi bi-plus-lg"></i> Add Key-Value Pair
        </button>
      </div>
      <div class="card-body">
        <div v-for="(pair, index) in configuration" :key="index" class="row mb-2">
          <div class="col-5">
            <input v-model="pair.key" type="text" class="form-control dark-input" placeholder="Key">
          </div>
          <div class="col-5">
            <input v-model="pair.value" type="text" class="form-control dark-input"
                   placeholder="Value">
          </div>
          <div class="col-2">
            <button @click="removeConfigPair(index)" class="btn btn-outline-danger btn-sm">
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
        <button @click="addParameter" class="btn btn-outline-primary btn-sm">
          <i class="bi bi-plus-lg"></i> Add Parameter
        </button>
      </div>
      <div class="card-body">
        <div v-for="(param, paramIndex) in parameters" :key="paramIndex" class="mb-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <input v-model="param.name" type="text" class="form-control dark-input w-75"
                   placeholder="Parameter name">
            <div>
              <button @click="addParameterValue(paramIndex)"
                      class="btn btn-outline-success btn-sm me-2">
                <i class="bi bi-plus-lg"></i> Add Value
              </button>
              <button @click="removeParameter(paramIndex)" class="btn btn-outline-danger btn-sm">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div v-for="(value, valueIndex) in param.values" :key="valueIndex" class="row mb-2">
            <div class="col-10">
              <input v-model="param.values[valueIndex]" type="text" class="form-control dark-input"
                     placeholder="Value">
            </div>
            <div class="col-2">
              <button @click="removeParameterValue(paramIndex, valueIndex)"
                      class="btn btn-outline-danger btn-sm">
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
        <button @click="addMacro" class="btn btn-outline-primary btn-sm">
          <i class="bi bi-plus-lg"></i> Add Macro
        </button>
      </div>
      <div class="card-body">
        <div v-for="(macro, macroIndex) in macros" :key="macroIndex" class="mb-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <input v-model="macro.name" type="text" class="form-control dark-input w-75"
                   placeholder="Macro name">
            <div>
              <button @click="addMacroValue(macroIndex)"
                      class="btn btn-outline-success btn-sm me-2">
                <i class="bi bi-plus-lg"></i> Add Value
              </button>
              <button @click="removeMacro(macroIndex)" class="btn btn-outline-danger btn-sm">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div v-for="(value, valueIndex) in macro.values" :key="valueIndex" class="row mb-2">
            <div class="col-10">
              <textarea v-model="macro.values[valueIndex]" class="form-control dark-input" rows="3"
                        placeholder="Value"></textarea>
            </div>
            <div class="col-2">
              <button @click="removeMacroValue(macroIndex, valueIndex)"
                      class="btn btn-outline-danger btn-sm">
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
        <button @click="addSubject" class="btn btn-outline-primary btn-sm">
          <i class="bi bi-plus-lg"></i> Add Subject
        </button>
      </div>
      <div class="card-body">
        <div v-for="(subject, subjectIndex) in subjects" :key="subjectIndex" class="mb-4">
          <div class="card dark-card">
            <div class="card-header bg-dark d-flex justify-content-between align-items-center">
              <input v-model="subject.name" type="text" class="form-control dark-input w-75"
                     :placeholder="`Subject ${subjectIndex + 1}`" disabled>
              <div>
                <button @click="addSubjectPair(subjectIndex)"
                        class="btn btn-outline-success btn-sm me-2">
                  <i class="bi bi-plus-lg"></i> Add Pair
                </button>
                <button @click="removeSubject(subjectIndex)" class="btn btn-outline-danger btn-sm">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div v-for="(pair, pairIndex) in subject.pairs" :key="pairIndex" class="row mb-2">
                <div class="col-5">
                  <input v-model="pair.key" type="text" class="form-control dark-input"
                         placeholder="Key">
                </div>
                <div class="col-5">
                  <input v-model="pair.value" type="text" class="form-control dark-input"
                         placeholder="Value">
                </div>
                <div class="col-2">
                  <button @click="removeSubjectPair(subjectIndex, pairIndex)"
                          class="btn btn-outline-danger btn-sm">
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
.dark-card {
  background-color: #242427;
  border-color: #2d2d31;
  color: #e1e1e1;
}

.dark-card .card-header {
  background-color: #2d2d31;
  border-bottom-color: #3a3a3e;
  color: #e1e1e1;
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
