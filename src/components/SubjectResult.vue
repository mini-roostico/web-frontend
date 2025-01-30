<script setup lang="ts">
import { ResolvedSubject } from '@/stores/suite.ts'
import { computed, ComputedRef, ref, Ref } from 'vue'
import YamlEditor from '@/components/YamlEditor.vue'
import ResultCard from '@/components/ResultCard.vue'

enum Type {
  Text = 'text',
  Code = 'code',
}

interface Props {
  result: ResolvedSubject
}

const props = defineProps<Props>()

const type: ComputedRef<Type> = computed(() => {
  return props.result?.values?.some((obj) => obj.key === 'code') ? Type.Code : Type.Text
})

const code: Ref<string> = ref(props.result?.values?.find((obj) => obj.key === 'code')?.value || '')
console.log(props.result.values)
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
