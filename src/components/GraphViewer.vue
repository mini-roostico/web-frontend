<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'

import { Controls } from '@vue-flow/controls'
import { Direction, useLayout } from '@/stores/layout.js'
import { GraphData } from '@/scripts/graph.ts'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      nodes: [],
      edges: [],
    }),
  },
})

defineEmits(['update:modelValue'])

const nodes = ref(props.modelValue.nodes)
const edges = ref(props.modelValue.edges)

watch(
  () => props.modelValue,
  (newValue: GraphData) => {
    nodes.value = newValue.nodes
    edges.value = newValue.edges
    layoutGraph(Direction.LeftToRight)
  },
  { immediate: true },
)

const { layout } = useLayout()

const { fitView } = useVueFlow()

async function layoutGraph(direction: Direction) {
  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    fitView()
  })
}
</script>

<template>
  <div style="height: 700px">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :nodes-draggable="false"
      :nodes-connectable="false"
      :elements-selectable="false"
      :zoom-on-scroll="false"
      :zoom-on-double-click="false"
      :pan-on-drag="false"
      @nodes-initialized="layoutGraph(Direction.LeftToRight)"
    >
      <Background />
      <Controls :show-zoom="false" :show-fit="false" :show-interactive="false" />
    </VueFlow>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/controls/dist/style.css';

.vue-flow__node-default {
  background-color: #c226a0;
  color: white;
}
</style>
