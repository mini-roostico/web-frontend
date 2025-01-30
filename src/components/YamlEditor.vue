<script setup lang="ts">
import hljs from 'highlight.js'
import CodeEditor from 'simple-code-editor'
import { Ref, ref, watch } from 'vue'
import 'highlight.js/styles/default.css'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('yaml', yaml)

const props = defineProps({
  modelValue: {
    type: String,
    default: () => '',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'androidstudio',
  },
  wrap: {
    type: Boolean,
    default: true,
  },
  language: {
    type: Array,
    default: () => ['yaml', 'YAML'],
  },
})

const emit = defineEmits(['update:modelValue'])

const text: Ref<string> = ref(props.modelValue)

// changes in model
watch(
  () => props.modelValue,
  (newValue) => {
    text.value = newValue
  },
  { immediate: true },
)

watch(text, (newText: string) => {
  emit('update:modelValue', newText)
})

function highlightCode(code: string) {
  return hljs.highlight(code, { language: 'yaml' }).value
}
</script>

<template>
  <div>
    <CodeEditor
      v-model="text"
      :theme="props.theme"
      :read-only="props.readOnly"
      :languages="[props.language]"
      :wrap="props.wrap"
      width="100%"
      :highlight="highlightCode"
    >
    </CodeEditor>
  </div>
</template>
