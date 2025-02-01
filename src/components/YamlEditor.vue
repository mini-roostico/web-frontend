<script setup lang="ts">
import hljs from 'highlight.js'
import CodeEditor from 'simple-code-editor'
import { Ref, ref, watch } from 'vue'
import 'highlight.js/styles/default.css'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('yaml', yaml)

/**
 * Props interface for YamlEditor component.
 * @property {string} modelValue - The value of the model.
 * @property {boolean} readOnly - Whether the editor is read-only.
 * @property {string} theme - The theme of the editor.
 * @property {boolean} wrap - Whether the editor should wrap text.
 * @property {string[]} language - The languages supported by the editor.
 */
interface Props {
  modelValue?: string
  readOnly?: boolean
  theme?: string
  wrap?: boolean
  language?: string[]
}

/**
 * The props of the component with default values.
 */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  readOnly: false,
  theme: 'androidstudio',
  wrap: true,
  language: () => ['yaml', 'YAML'],
})

/**
 * Emits interface for YamlEditor component. It emits the 'update:modelValue' event when the
 * internal text changes.
 */
const emit = defineEmits(['update:modelValue'])

/**
 * The text of the editor.
 */
const text: Ref<string> = ref(props.modelValue)

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

/**
 * Highlights the code.
 * @param code - The code to be highlighted.
 * @returns The highlighted code.
 */
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
