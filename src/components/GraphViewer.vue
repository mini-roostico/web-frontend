<script setup>
import {nextTick, ref, watch} from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'

import { useLayout } from './useLayout'
import {Controls} from "@vue-flow/controls";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      nodes: [],
      edges: [],
    }),
  },
});

const emit = defineEmits(['update:modelValue']);

const nodes = ref(props.modelValue.nodes);
const edges = ref(props.modelValue.edges);

watch(
  () => props.modelValue,
  (newValue) => {
    nodes.value = newValue.nodes;
    edges.value = newValue.edges;
  },
  { immediate: true }
);

const { layout } = useLayout()

const { fitView } = useVueFlow()

async function layoutGraph(direction) {
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
      @nodes-initialized="layoutGraph('TB')"
      :delete-key-code="null"
    >
      <Background/>
      <Controls
        :show-zoom="false"
        :show-fit="false"
        :show-interactive="false"
      />
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
