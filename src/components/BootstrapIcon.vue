<script setup lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import { onMounted, Ref, ref } from 'vue'

/**
 * Reference to the "\<i\>" tag corresponding to the icon.
 */
const iconI: Ref<HTMLElement> = ref(null)

/**
 * Properties of the icon. `icon` is the class of the icon, `size` is the size of the icon, `color`
 * is the color of the icon, `toggleable` is a boolean property that determines if the icon can be
 * toggled, and `toggleColor` is the color of the icon when it is toggled.
 */
const props = defineProps({
  icon: {
    default: 'bi bi-alarm',
    type: String,
  },
  size: {
    default: '1rem',
    type: String,
  },
  color: {
    default: 'black',
    type: String,
  },
  toggleable: {
    default: false,
    type: Boolean,
  },
  toggleColor: {
    default: 'black',
    type: String,
  },
})

onMounted(() => {
  if (props.toggleable) {
    iconI.value.classList.remove('icon')
  }
})

function click() {
  iconI.value.classList.toggle('selected')
}
</script>
<template>
  <div>
    <i
      ref="icon"
      :class="`${icon} icon`"
      :style="`font-size: ${size}; color: ${color};`"
      @click="click"
    ></i>
  </div>
</template>
<style scoped>
.icon:hover {
  filter: brightness(50%);
  transition: 0.3s;
}
.selected {
  color: v-bind('toggleColor') !important;
}
</style>
