<script setup lang="ts">
import { type Source } from '@/stores/sources.ts'
import { formatDate } from '../commons/utils.ts'

interface Props {
  source: Source
  mainColor: string
}

const props = defineProps<Props>()

const emit = defineEmits(['open', 'rename', 'delete'])

function openFile() {
  emit('open', props.source)
}

function renameFile() {
  emit('rename', props.source)
}

function deleteFile() {
  emit('delete', props.source)
}
</script>
<template>
  <div class="card file-card shadow-sm" @click="openFile">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <!-- File Icon -->
        <i class="fas fa-file-alt fa-3x" :style="{ color: props.mainColor }"></i>

        <!-- Three-dot menu -->
        <div class="dropdown" @click.stop>
          <button
            id="dropdownMenuButton"
            class="btn btn-link text-white dropdown-toggle p-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#" @click.prevent="openFile">Open</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="renameFile">Change Name</a></li>
            <li>
              <a class="dropdown-item text-danger" href="#" @click.prevent="deleteFile">Delete</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- File title and subtitle -->
      <h5 class="card-title text-white text-truncate">{{ props.source.name }}</h5>
      <p class="card-subtitle text-muted text-truncate">
        Last modified: {{ formatDate(props.source.lastModified) }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.card.file-card {
  background-color: #232329;
  border: none;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card.file-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(206, 41, 170, 0.5);
}

.card-title {
  font-family: 'Poppins', sans-serif;
}

.card-subtitle {
  font-size: 0.9rem;
  color: white !important;
}

.dropdown-menu {
  background-color: #232329;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
  color: #fff;
}

.dropdown-item:hover {
  background-color: rgba(206, 41, 170, 0.2);
}

.dropdown-item.text-danger:hover {
  background-color: rgba(255, 0, 0, 0.2);
}
</style>
