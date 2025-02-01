<script setup lang="ts">
import { ref, computed, Ref, ComputedRef, onMounted } from 'vue'
import { Router, useRouter } from 'vue-router'
import SourceCard from '@/components/SourceCard.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSourceStore } from '@/stores/sources.ts'
import AlertComponent from '@/components/AlertComponent.vue'
import { AlertType } from '@/commons/utils.ts'
import { Source } from '@/commons/model.ts'

/**
 * Enum for the modal actions.
 */
enum ModalAction {
  Rename = 'rename',
  Delete = 'delete',
  Create = 'create',
}

/**
 * Main color of the page.
 */
const mainColor: string = '#CE29AA'

/**
 * Router instance.
 */
const router: Router = useRouter()

/**
 * Source store instance.
 */
const sourceStore = useSourceStore()
/**
 * Stores to handle authentication state.
 */
const authStore = useAuthStore()

/**
 * Modal component reference.
 */
const userModal: Ref<typeof ModalComponent> = ref(null)

/**
 * Rename input value.
 */
const renameInput: Ref<string> = ref('')
/**
 * New file input value.
 */
const newFileInput: Ref<string> = ref('')

/**
 * Modal action selected.
 */
const modalAction: Ref<ModalAction> = ref(ModalAction.Rename)

/**
 * Alert component reference.
 */
const alert: Ref<typeof AlertComponent> = ref(null)
/**
 * Whether the page is loading or not.
 */
const loading: Ref<boolean> = ref(false)
/**
 * Whether the user is logged in or not.
 */
const isLogged: Ref<boolean> = ref(authStore.isLogged)

/**
 * Reference to the list of sources loaded.
 */
const sources: Ref<Source[]> = ref([])
/**
 * Reference to the selected source (through filtering).
 */
const selectedSource: Ref<Source | null> = ref(null)
/**
 * Search query for filtering sources.
 */
const searchQuery: Ref<string> = ref('')

/**
 * Refreshes the sources list.
 */
function refreshSources() {
  loading.value = true
  sourceStore
    .getSources()
    .then((data) => {
      sources.value.length = 0
      sources.value.push(...data)
    })
    .catch((error) => {
      console.error('Error fetching sources:', error)
      showAlert('Error fetching sources. Please try again later.', AlertType.DANGER)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  refreshSources()
})

/**
 * Computed property to filter sources based on the search query.
 */
const filteredSources: ComputedRef<Source[]> = computed(() => {
  return sources.value.filter((source) =>
    source.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

/**
 * Shows an alert with the given text and type.
 * @param text Text to show in the alert.
 * @param type Type of the alert.
 */
function showAlert(text: string, type: AlertType = AlertType.INFO) {
  alert.value.show(text, type)
}

/**
 * Callback function when the modal is opened.
 */
function handleModalOpen() {
  // do nothing
}

/**
 * Callback function when the modal is closed.
 */
function handleModalClose() {
  // do nothing
}

/**
 * Creates a new empty source. Shows an alert on success or error.
 */
function createSource() {
  loading.value = true
  sourceStore
    .createSource(newFileInput.value)
    .then((source: Source) => {
      showAlert(`Source "${source.name}" created successfully!`, AlertType.DANGER)
      refreshSources()
    })
    .catch((error) => {
      console.error('Error creating source:', error)
      showAlert('Error creating source. Please try again later.', AlertType.DANGER)
    })
    .finally(() => {
      loading.value = false
    })
}

/**
 * Deletes the selected source. Shows an alert on success or error.
 */
function deleteSource() {
  if (selectedSource.value) {
    loading.value = true
    sourceStore
      .deleteSource(selectedSource.value.id)
      .then(() => {
        showAlert('Source deleted successfully!', AlertType.SUCCESS)
        refreshSources()
      })
      .catch((error) => {
        console.error('Error deleting source:', error)
        showAlert('Error deleting source. Please try again later.', AlertType.DANGER)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

/**
 * Renames the selected source. Shows an alert on success or error.
 * @param newName New name for the source.
 */
function renameSource(newName: string) {
  if (selectedSource.value && newName) {
    loading.value = true
    sourceStore
      .renameSource(selectedSource.value.id, newName)
      .then(() => {
        showAlert('Source renamed successfully!', AlertType.SUCCESS)
        refreshSources()
      })
      .catch((error) => {
        console.error('Error renaming source:', error)
        showAlert('Error renaming source. Please try again later.', AlertType.DANGER)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

/**
 * Handles the user confirmation modal. Based on the action, performs the required operation.
 */
function handleConfirmation() {
  switch (modalAction.value) {
    case ModalAction.Create:
      if (newFileInput.value !== '') {
        createSource()
      } else {
        showAlert('Please enter a name for the new source.', AlertType.DANGER)
        return
      }
      break

    case ModalAction.Delete:
      deleteSource()
      showAlert('Source deleted successfully!', AlertType.SUCCESS)
      break

    case ModalAction.Rename:
      renameSource(renameInput.value)
      showAlert('Source renamed successfully!', AlertType.SUCCESS)
      break
  }
  selectedSource.value = null
}

/**
 * Handles the user cancellation of the action.
 */
function handleCancellation() {
  console.log('User cancelled the action')
}

/**
 * Opens the file in the editor. Redirects to the suite page.
 * @param source Source to open.
 */
function openFile(source: Source) {
  selectedSource.value = source
  console.log('Opening file:', source)
  router.push({ path: `/suite/${source.id}` })
}

/**
 * Renames the file with a modal.
 * @param source Source to rename.
 */
function renameFileModal(source: Source) {
  selectedSource.value = source
  modalAction.value = ModalAction.Rename
  renameInput.value = source.name
  userModal.value.open({ title: `Renaming: ${source.name}` })
}

/**
 * Deletes the file with a modal.
 * @param source Source to delete.
 */
function deleteFileModal(source: Source) {
  selectedSource.value = source
  modalAction.value = ModalAction.Delete
  userModal.value.open({ title: `Deleting: ${source.name}` })
}

/**
 * Creates a new file with a modal.
 */
function createNewFileModal() {
  newFileInput.value = ''
  modalAction.value = ModalAction.Create
  userModal.value.open({ title: 'Create New Source' })
}
</script>
<template>
  <div v-if="isLogged" class="sources-view container py-4">
    <h1 class="text-center mb-4" :style="{ color: mainColor }">Sources</h1>
    <AlertComponent ref="alert"></AlertComponent>
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
          required
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
      <button class="btn btn-success" @click="createNewFileModal">
        <i class="fas fa-plus me-2"></i>New Source
      </button>
    </div>
    <div v-if="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- If there are no files, show the placeholder -->
    <div v-else-if="filteredSources.length === 0" class="no-files text-center py-5">
      <i class="fas fa-folder-open fa-4x mb-3" :style="{ color: mainColor }"></i>
      <p class="text-muted">Wow...it's empty here!</p>
    </div>

    <!-- Source cards -->
    <div v-else class="row g-3">
      <div
        v-for="(source, index) in filteredSources"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <SourceCard
          :source="source"
          :main-color="mainColor"
          @open="openFile(source)"
          @rename="renameFileModal(source)"
          @delete="deleteFileModal(source)"
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
