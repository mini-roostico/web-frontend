<script setup>
import { ref, useSlots } from 'vue'

const emit = defineEmits(['modal-opened', 'modal-closed', 'modal-confirmed', 'modal-cancelled'])
const slots = useSlots()
const title = ref('')

const isVisible = ref(false)
let resolveClose = null
let rejectClose = null
const open = (data = null) => {
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

const close = (result = null) => {
  isVisible.value = false
  emit('modal-closed', result)
  if (resolveClose) {
    resolveClose(result)
  }
}

const cancel = () => {
  isVisible.value = false
  emit('modal-cancelled')
  if (rejectClose) {
    rejectClose()
  }
}

const confirm = () => {
  emit('modal-confirmed')
  close()
}

defineExpose({ open, close, cancel })
</script>
<template>
  <div
    class="modal dark-modal"
    :class="{ show: isVisible }"
    tabindex="-1"
    role="dialog"
    :style="{ display: isVisible ? 'block' : 'none' }"
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
            <button type="button" class="btn btn-primary" @click="confirm">Confirm</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
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
