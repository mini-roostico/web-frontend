<script setup lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import YamlEditor from '@/components/YamlEditor.vue'
import ResultCard from '@/components/ResultCard.vue'
import { ResolvedSubject } from '@/commons/model.ts'

/**
 * Utility enum to determine the type of the result.
 */
enum Type {
  /**
   * The result is simple text.
   */
  Text = 'text',
  /**
   * The result is code.
   */
  Code = 'code',
}

/**
 * The props of the component. It contains the result to be displayed.
 */
interface Props {
  /**
   * The result to be displayed.
   */
  result: ResolvedSubject
}

const props = defineProps<Props>()

/**
 * The type of the result.
 */
const type: ComputedRef<Type> = computed(() => {
  return props.result?.values?.some((obj) => obj.key === 'code') ? Type.Code : Type.Text
})

function setupCode(result: ResolvedSubject): string {
  return result?.values?.find((obj) => obj.key === 'code')?.value || ''
}

/**
 * The code of the result. Empty string if the result is not code.
 */
const code: Ref<string> = ref(setupCode(props.result))

watch(
  () => props.result,
  (newResult: ResolvedSubject) => {
    code.value = setupCode(newResult)
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="type === Type.Code" class="mt-2 mb-2">
    <h5 class="text-white">{{ result.name }}</h5>
    <YamlEditor v-model="code" :read-only="true" :wrap="true"></YamlEditor>
  </div>
  <div v-else class="mt-2 mb-2">
    <ResultCard :title="props.result.name" :items="props.result.values"></ResultCard>
  </div>
</template>

<style scoped></style>
