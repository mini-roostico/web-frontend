<script setup lang="ts">
import { Ref, ref, useSlots } from 'vue'

const emit = defineEmits(['modal-opened', 'modal-closed', 'modal-confirmed', 'modal-cancelled'])
const slots = useSlots()
const title: Ref<string> = ref('')

const isVisible: Ref<boolean> = ref(false)
let resolveClose = null
let rejectClose = null

function open(data = null) {
  isVisible.value = true
  if (data && data.title) {
    title.value = data.title
  }
  emit('modal-opened', data)
  return new Promise((resolve, reject) => {
    resolveClose = resolve
    rejectClose = reject
  })
}

function close(result = null) {
  isVisible.value = false
  emit('modal-closed', result)
  if (resolveClose) {
    resolveClose(result)
  }
}

function cancel() {
  isVisible.value = false
  emit('modal-cancelled')
  if (rejectClose) {
    rejectClose()
  }
}

function confirm() {
  emit('modal-confirmed')
  close()
}

defineExpose({ open, close, cancel })
</script>
<template>
  <form
    class="modal dark-modal"
    :class="{ show: isVisible }"
    tabindex="-1"
    :style="{ display: isVisible ? 'block' : 'none' }"
    @submit.prevent="confirm"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="title" class="modal-title">{{ title }}</h5>
          <h5 v-else-if="slots.title" class="modal-title">
            <slot name="title"></slot>
          </h5>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-secondary" @click="close">Close</button>
            <button type="submit" class="btn btn-primary">Confirm</button>
          </slot>
        </div>
      </div>
    </div>
  </form>
</template>
<style scoped>
.dark-modal .modal-content {
  background-color: #1e1e1e;
  color: #ffffff;
  border: 1px solid #c226a0ff;
}

.dark-modal .modal-header {
  border-bottom: 1px solid #c226a0ff;
}

.dark-modal .modal-footer {
  border-top: 1px solid #c226a0ff;
}

.dark-modal .modal-title {
  color: #c226a0ff;
}

.dark-modal .close {
  color: #ffffff;
  opacity: 0.7;
}

.dark-modal .close:hover {
  color: #c226a0ff;
  opacity: 1;
}

.dark-modal .btn-secondary {
  background-color: #444;
  border-color: #666;
}

.dark-modal .btn-primary {
  background-color: #c226a0ff;
  border-color: #c226a0ff;
}

.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
