<script setup>
import hljs from 'highlight.js'
import CodeEditor from 'simple-code-editor'
import { ref, watch } from 'vue'
import 'highlight.js/styles/default.css'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('yaml', yaml)

const props = defineProps({
  modelValue: {
    type: String,
    default: () => '',
  },
})

const emit = defineEmits(['update:modelValue'])

const text = ref(props.modelValue.text)

// changes in model
watch(
  () => props.modelValue,
  (newValue) => {
    text.value = newValue
  },
  { immediate: true },
)

// local changes propagated
watch(text, (newText) => {
  emit('update:modelValue', newText)
})

const highlightCode = (code) => {
  return hljs.highlight(code, { language: 'yaml' }).value
}
</script>

<template>
  <div>
    <CodeEditor
      v-model="text"
      theme="androidstudio"
      :read-only="false"
      :languages="[['yaml', 'YAML']]"
      :wrap="false"
      width="100%"
      height="700px"
      :highlight="highlightCode"
    >
    </CodeEditor>
  </div>
</template>
