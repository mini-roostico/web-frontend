/**
 * Represents a point in 2D space.
 * @property x - The x-coordinate of the point.
 * @property y - The y-coordinate of the point.
 */
export interface Point {
  x: number
  y: number
}

/**
 * Represents a tree node.
 * @property id - The unique identifier of the node.
 * @property position - The position of the node in 2D space.
 * @property data - The data of the node.
 * @property data.label - The label of the node.
 */
export interface TreeNode {
  id: string
  position: Point
  data: {
    label: string
  }
}

/**
 * Represents an edge between two nodes.
 * @property id - The unique identifier of the edge.
 * @property source - The source node of the edge.
 * @property target - The target node of the edge.
 */
export interface Edge {
  id: string
  source: string
  target: string
}

/**
 * Represents the data of a graph.
 * @property nodes - The nodes of the graph.
 * @property edges - The edges of the graph.
 */
export interface GraphData {
  nodes: TreeNode[]
  edges: Edge[]
}

/**
 * Converts the given graph to a GraphData object.
 * @param graph the graph to convert, returned by Subjekt.
 */
export function convertGraph(graph: Record<number, string[]>): GraphData {
  const position: Point = { x: 0, y: 0 }
  const nodes: TreeNode[] = []
  const edges: Edge[] = []

  nodes.push({
    id: 'root',
    position,
    data: { label: 'Root' },
  })

  Object.entries(graph).forEach(([key, strings], index) => {
    const subjectId = `s${key}`

    nodes.push({
      id: subjectId,
      position,
      data: { label: `Subject ${key}` },
    })

    edges.push({
      id: `root-${subjectId}`,
      source: 'root',
      target: subjectId,
    })

    strings.forEach((str, strIndex) => {
      const stringId = `rs${strIndex + index * 10}` // Note: Unique ID for each string

      nodes.push({
        id: stringId,
        position,
        data: { label: str },
      })

      edges.push({
        id: `${subjectId}-${stringId}`,
        source: subjectId,
        target: stringId,
      })
    })
  })

  return { nodes, edges }
}
