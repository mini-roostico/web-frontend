<script setup lang="ts">
import { ref } from 'vue'
import { AlertType } from '@/commons/utils.ts'

/**
 * Text of the alert.
 */
const alertText = ref('')
/**
 * Type of the alert.
 */
const alertType = ref(AlertType.INFO)

/**
 * Properties of the alert. `cancellable` is a boolean property that determines if the alert can
 * be closed by the user.
 */
const props = defineProps({
  cancellable: {
    type: Boolean,
    default: true,
  },
})

/**
 * Shows an alert with the given text and type.
 * @param text Text of the alert.
 * @param type Type of the alert.
 */
function show(text: string, type: AlertType) {
  alertText.value = text
  alertType.value = type
}

/**
 * Clears the alert.
 */
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
    <button
      v-if="props.cancellable"
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="clear"
    ></button>
  </div>
</template>
