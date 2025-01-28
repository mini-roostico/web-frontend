<script setup lang="ts">
import hljs from 'highlight.js'
import CodeEditor from 'simple-code-editor'
import { Ref, ref, watch } from 'vue'
import 'highlight.js/styles/default.css'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('yaml', yaml)

const props = defineProps({
  editorContent: {
    type: String,
    default: () => '',
  },
})

const emit = defineEmits(['update:modelValue'])

const text: Ref<string> = ref(props.editorContent)

// changes in model
watch(
  () => props.editorContent,
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
