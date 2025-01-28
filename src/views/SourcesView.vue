<script setup lang="ts">
import { ref, computed, Ref, ComputedRef } from 'vue'
import { Router, useRouter } from 'vue-router'
import SourceCard from '@/components/SourceCard.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { useAuthStore } from '@/stores/auth.ts'

type ModalAction = 'rename' | 'delete' | 'create'
type AlertType = 'alert-info' | 'alert-danger' | 'alert-success'
type Source = { title: string; lastModified: string }

const mainColor: string = '#CE29AA'

const router: Router = useRouter()

const userModal = ref(null)
const renameInput: Ref<string> = ref('')
const newFileInput: Ref<string> = ref('')

const modalAction: Ref<ModalAction> = ref('rename')

const alertText = ref('')
const alertType: Ref<AlertType> = ref('alert-info')

const loading: Ref<boolean> = ref(false)
const authStore = useAuthStore()
const isLogged: Ref<boolean> = ref(authStore.isLogged)

// temporary placeholder
const sources: Ref<Source[], Source[]> = ref([
  { title: 'Document 1', lastModified: '2025-01-15' },
  { title: 'Presentation', lastModified: '2025-01-10' },
  { title: 'Notes', lastModified: '2025-01-08' },
  { title: 'Budget Plan', lastModified: '2025-01-01' },
])

const searchQuery: Ref<string, string> = ref('')

const filteredFiles: ComputedRef<Source[]> = computed(() => {
  return sources.value.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

function showAlert(text: string, type: AlertType = 'alert-info') {
  alertText.value = text
  alertType.value = type
}

function clearAlert() {
  alertText.value = ''
}

function handleModalOpen() {
  // do nothing
}

function handleModalClose() {
  // do nothing
}

function handleConfirmation() {
  switch (modalAction.value) {
    case 'create':
      if (newFileInput.value !== '') {
        sources.value.push({
          title: newFileInput.value,
          lastModified: new Date().toISOString().split('T')[0],
        })
      }
      showAlert('New source created successfully!', 'alert-success')
      // TODO Perform creation logic
      break

    case 'delete':
      console.log('User confirmed deletion')
      showAlert('Source deleted successfully!', 'alert-success')
      // TODO Perform deletion logic
      break

    case 'rename':
      console.log('User confirmed with input:', renameInput.value)
      showAlert('Source renamed successfully!', 'alert-success')
      // TODO Perform renaming logic
      break
  }
}

function handleCancellation() {
  console.log('User cancelled the action')
}

function openFile(source: Source) {
  // TODO
  console.log('Opening file:', source)
  router.push({ path: `/suite/${source.title}` })
}

function renameFile(source: Source) {
  // TODO
  modalAction.value = 'rename'
  renameInput.value = source.title
  userModal.value.open({ title: `Renaming: ${source.title}` })
}

function deleteFile(source: Source) {
  // TODO
  modalAction.value = 'delete'
  userModal.value.open({ title: `Deleting: ${source.title}` })
}

function createNewFile() {
  // TODO
  modalAction.value = 'create'
  newFileInput.value = ''
  userModal.value.open({ title: 'Create New Source' })
}
</script>
<template>
  <div v-if="isLogged" class="sources-view container py-4">
    <h1 class="text-center mb-4" :style="{ color: mainColor }">Sources</h1>
    <!-- Alert Component -->
    <div
      v-if="alertText"
      class="alert alert-dismissible alert-dark fade show"
      :class="alertType"
      role="alert"
    >
      {{ alertText }}
      <button type="button" class="btn-close" aria-label="Close" @click="clearAlert"></button>
    </div>
    <!-- User Confirmation Modal -->
    <ModalComponent
      ref="userModal"
      title="User Confirmation"
      @modal-opened="handleModalOpen"
      @modal-closed="handleModalClose"
      @modal-confirmed="handleConfirmation"
      @modal-cancelled="handleCancellation"
    >
      <div v-if="modalAction === 'rename'">
        <p class="text-start">Enter new name:</p>
        <input
          v-model="renameInput"
          class="form-control dark-input w-75 inline-block"
          placeholder="Enter additional details"
        />
      </div>
      <div v-else-if="modalAction === 'delete'">
        <p class="text-start">Are you sure you want to delete this source?</p>
      </div>
      <div v-else-if="modalAction === 'create'">
        <p class="text-start">Enter the name of the new source:</p>
        <input
          v-model="newFileInput"
          class="form-control dark-input w-75 inline-block"
          placeholder="Enter the name of the new source"
        />
      </div>
      <div v-else>Unrecognized: {{ modalAction }}</div>
    </ModalComponent>
    <!-- Search and Add New Button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control w-75 me-3"
        placeholder="Search sources..."
      />
      <button class="btn btn-success" @click="createNewFile">
        <i class="fas fa-plus me-2"></i>New Source
      </button>
    </div>
    <div v-if="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- If there are no files, show the placeholder -->
    <div v-else-if="filteredFiles.length === 0" class="no-files text-center py-5">
      <i class="fas fa-folder-open fa-4x mb-3" :style="{ color: mainColor }"></i>
      <p class="text-muted">Wow...it's empty here!</p>
    </div>

    <!-- Source cards -->
    <div v-else class="row g-3">
      <div
        v-for="(file, index) in filteredFiles"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <SourceCard
          :file="file"
          :main-color="mainColor"
          @open="openFile(file)"
          @rename="renameFile(file)"
          @delete="deleteFile(file)"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-white text-center mt-5">Please log in to view this page.</p>
  </div>
</template>
<style scoped>
.sources-view {
  background-color: #19191c;
  border-radius: 8px;
  color: #fff;
}

.no-files {
  font-family: 'Poppins', sans-serif;
}

.no-files i {
  display: block;
}

.text-muted {
  color: #ccc !important;
}

input.form-control {
  background-color: #232329;
  color: #fff;
  border: 1px solid #ce29aa;
}

input.form-control::placeholder {
  color: #aaa;
}

input.form-control:focus {
  box-shadow: 0 0 5px #ce29aa;
}

button.btn-success {
  background-color: #ce29aa;
  border: none;
}

button.btn-success:hover {
  background-color: #a32088;
}

button.btn-success i {
  color: #fff;
}
</style>
