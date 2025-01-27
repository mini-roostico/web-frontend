<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SourceCard from '@/components/SourceCard.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { AuthService } from '@/scripts/AuthService.ts'

const mainColor = '#CE29AA'

const router = useRouter()

const userModal = ref(null)
const renameInput = ref('')
const newFileInput = ref('')

const modalAction = ref('rename') // 'rename' or 'delete'
const loading = ref(false)

const alertText = ref('')
const alertType = ref('alert-info')

const showAlert = (text, type = 'alert-info') => {
  alertText.value = text
  alertType.value = type
}

const clearAlert = () => {
  alertText.value = ''
}
/* eslint-disable no-unused-vars */
const handleModalOpen = (_) => {
  // do nothing
}

const handleModalClose = (_) => {
  // do nothing
}

const handleConfirmation = () => {
  if (modalAction.value === 'rename') {
    console.log('User confirmed with input:', renameInput.value)
    showAlert('Source renamed successfully!', 'alert-success')
    // TODO Perform renaming logic
  } else if (modalAction.value === 'delete') {
    console.log('User confirmed deletion')
    showAlert('Source deleted successfully!', 'alert-success')
    // TODO Perform deletion logic
  } else if (modalAction.value === 'create') {
    if (newFileInput.value !== '') {
      files.value.push({
        title: newFileInput.value,
        lastModified: new Date().toISOString().split('T')[0],
      })
    }
    showAlert('New source created successfully!', 'alert-success')
    // TODO Perform creation logic
  }
}

const handleCancellation = () => {
  console.log('User cancelled the action')
}

// Example file data
const files = ref([
  { title: 'Document 1', lastModified: '2025-01-15' },
  { title: 'Presentation', lastModified: '2025-01-10' },
  { title: 'Notes', lastModified: '2025-01-08' },
  { title: 'Budget Plan', lastModified: '2025-01-01' },
])

const searchQuery = ref('')

const filteredFiles = computed(() => {
  return files.value.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const openFile = (file) => {
  console.log('Opening file:', file)
  router.push({ path: `/suite/${file.title}` })
}

const renameFile = (file) => {
  modalAction.value = 'rename'
  renameInput.value = file.title
  userModal.value.open({ title: `Renaming: ${file.title}` })
}

const deleteFile = (file) => {
  modalAction.value = 'delete'
  userModal.value.open({ title: `Deleting: ${file.title}` })
}

const createNewFile = () => {
  modalAction.value = 'create'
  newFileInput.value = ''
  userModal.value.open({ title: 'Create New Source' })
}

const isLogged = ref(AuthService.isAuthenticated())
</script>
<template>
  <div class="sources-view container py-4" v-if="isLogged">
    <h1 class="text-center mb-4" :style="{ color: mainColor }">Sources</h1>
    <!-- Alert Component -->
    <div
      v-if="alertText"
      class="alert alert-dismissible alert-dark fade show"
      :class="alertType"
      role="alert"
    >
      {{ alertText }}
      <button type="button" class="btn-close" @click="clearAlert" aria-label="Close"></button>
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
          class="form-control dark-input w-75 inline-block"
          v-model="renameInput"
          placeholder="Enter additional details"
        />
      </div>
      <div v-else-if="modalAction === 'delete'">
        <p class="text-start">Are you sure you want to delete this source?</p>
      </div>
      <div v-else-if="modalAction === 'create'">
        <p class="text-start">Enter the name of the new source:</p>
        <input
          class="form-control dark-input w-75 inline-block"
          v-model="newFileInput"
          placeholder="Enter the name of the new source"
        />
      </div>
      <div v-else>Unrecognized: {{ modalAction }}</div>
    </ModalComponent>
    <!-- Search and Add New Button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <input
        type="text"
        class="form-control w-75 me-3"
        placeholder="Search sources..."
        v-model="searchQuery"
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
          :mainColor="mainColor"
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
