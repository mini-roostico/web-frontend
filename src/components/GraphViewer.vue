<script setup>
import {nextTick, ref, watch} from 'vue'
import { VueFlow, useVueFlow, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'

import {Controls} from "@vue-flow/controls";
import dagre from '@dagrejs/dagre'

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
function useLayout() {
  const { findNode } = useVueFlow()

  const graph = ref(new dagre.graphlib.Graph())

  const previousDirection = ref('LR')

  function layout(nodes, edges, direction) {
    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph()

    graph.value = dagreGraph

    dagreGraph.setDefaultEdgeLabel(() => ({}))

    const isHorizontal = direction === 'LR'
    dagreGraph.setGraph({ rankdir: direction })

    previousDirection.value = direction

    for (const node of nodes) {
      // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
      const graphNode = findNode(node.id)

      dagreGraph.setNode(node.id, { width: graphNode.dimensions.width || 150, height: graphNode.dimensions.height || 50 })
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target)
    }

    dagre.layout(dagreGraph)

    // set nodes with updated positions
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)

      return {
        ...node,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      }
    })
  }

  return { graph, layout, previousDirection }
}

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
