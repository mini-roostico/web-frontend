<template>
  <div class="sources-view container py-4">
    <h1 class="text-center mb-4" :style="{ color: mainColor }">Sources</h1>

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

    <!-- If there are no files, show the placeholder -->
    <div v-if="filteredFiles.length === 0" class="no-files text-center py-5">
      <i class="fas fa-folder-open fa-4x mb-3" :style="{ color: mainColor }"></i>
      <p class="text-muted">Wow...it's empty here!</p>
    </div>

    <!-- File cards -->
    <div v-else class="row g-3">
      <div
        v-for="(file, index) in filteredFiles"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <SourceCard
          :file="file"
          :mainColor="mainColor"
          @open="openFile"
          @rename="renameFile"
          @delete="deleteFile(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import SourceCard from "@/components/SourceCard.vue";
import router from "@/router/index.js";

export default {
  name: "SourcesView",
  components: {
    SourceCard,
  },
  setup() {
    const mainColor = "#CE29AA";

    // Example file data
    const files = ref([
      { title: "Document 1", lastModified: "2025-01-15" },
      { title: "Presentation", lastModified: "2025-01-10" },
      { title: "Notes", lastModified: "2025-01-08" },
      { title: "Budget Plan", lastModified: "2025-01-01" },
    ]);

    const searchQuery = ref("");

    const filteredFiles = computed(() => {
      return files.value.filter((file) =>
        file.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const openFile = (file) => {
      router.push({ path: "/suite" })
    };

    const renameFile = (file) => {
      const newName = prompt("Enter new name:", file.title);
      if (newName) file.title = newName;
    };

    const deleteFile = (index) => {
      if (confirm("Are you sure you want to delete this source?")) {
        files.value.splice(index, 1);
      }
    };

    const createNewFile = () => {
      const newFileName = prompt("Enter the name of the new source:");
      if (newFileName) {
        files.value.push({
          title: newFileName,
          lastModified: new Date().toISOString().split("T")[0],
        });
      }
    };

    return {
      mainColor,
      files,
      searchQuery,
      filteredFiles,
      openFile,
      renameFile,
      deleteFile,
      createNewFile,
    };
  },
};
</script>

<style scoped>
.sources-view {
  background-color: #19191C;
  border-radius: 8px;
  color: #fff;
}

.no-files {
  font-family: "Poppins", sans-serif;
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
  border: 1px solid #CE29AA;
}

input.form-control::placeholder {
  color: #aaa;
}

input.form-control:focus {
  box-shadow: 0 0 5px #CE29AA;
}

button.btn-success {
  background-color: #CE29AA;
  border: none;
}

button.btn-success:hover {
  background-color: #a32088;
}

button.btn-success i {
  color: #fff;
}
</style>
