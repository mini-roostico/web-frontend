<script setup lang="ts">
import { ref } from 'vue'
import { AlertType } from '@/commons/utils.ts'

const alertText = ref('')
const alertType = ref(AlertType.INFO)

function show(text: string, type: AlertType) {
  alertText.value = text
  alertType.value = type
}

function clear() {
  alertText.value = ''
}

defineExpose({
  show,
  clear,
})
</script>
<template>
  <div
    v-if="alertText"
    class="alert alert-dismissible alert-dark fade show m-4"
    :class="alertType"
    role="alert"
  >
    {{ alertText }}
    <button type="button" class="btn-close" aria-label="Close" @click="clear"></button>
  </div>
</template>
