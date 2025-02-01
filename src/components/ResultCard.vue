<script setup lang="ts">
import { PropType } from 'vue'

/**
 * Utility interface to represent a key-value pair.
 */
interface KeyValuePair {
  key: string
  value: string
}

/**
 * The props of the component. `title` is the title of the card and `items` is an array of key-value
 * pairs.
 */
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<KeyValuePair[]>,
    required: true,
  },
})
</script>
<template>
  <div class="card bg-dark text-white">
    <div class="card-header">
      <h5 class="card-title mb-0">{{ props.title }}</h5>
    </div>
    <div class="card-body">
      <dl class="row mb-0">
        <template v-for="(item, index) in props.items" :key="index">
          <dt class="col-sm-3">
            <code class="text-light">{{ item.key }}</code>
          </dt>
          <dd class="col-sm-9">
            <p class="text-wrap">{{ item.value }}</p>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>
<style scoped>
.card {
  background-color: #212123 !important;
  border: none;
}

.card-header {
  border-bottom: 1px solid rgb(33, 33, 35);
}

code {
  background-color: rgb(33, 33, 35);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

.text-wrap {
  white-space: pre-wrap;
  word-break: break-word;
}

dt {
  display: flex;
  align-items: center;
}
</style>
