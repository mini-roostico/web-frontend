<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'

import { Controls } from '@vue-flow/controls'
import { Direction, useLayout } from '@/stores/layout.js'
import { GraphData } from '@/scripts/graph.ts'

/**
 * Properties of the component. `modelValue` is the graph data that will be displayed.
 */
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

/**
 * Reference to the nodes of the graph.
 */
const nodes = ref(props.modelValue.nodes)
/**
 * Reference to the edges of the graph.
 */
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
/**
 * Layouts the graph in the given direction.
 */
const { layout } = useLayout()

/**
 * Fits the view of the graph.
 */
const { fitView } = useVueFlow()

/**
 * Layouts the graph in the given direction and fits the view.
 * @param direction Direction of the layout.
 */
async function layoutGraph(direction: Direction) {
  nodes.value = layout(nodes.value, edges.value, direction)

  await nextTick(() => {
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
