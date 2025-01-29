export type Point = { x: number; y: number }

export type TreeNode = {
  id: string
  position: Point
  data: {
    label: string
  }
}

export type Edge = {
  id: string
  source: string
  target: string
}

export type GraphData = {
  nodes: TreeNode[]
  edges: Edge[]
}

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
