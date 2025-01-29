import { defineStore } from 'pinia'
import { io } from '@mini-roostico/subjekt'
import subjekt = io.github.subjekt.Subjekt
import { convertGraph, GraphData } from '@/scripts/graph.ts'

interface ResolvedSubject {
  name: string
  values: { key: string; value: string }[]
}

interface GenerationResult {
  generationGraph: GraphData
  result: ResolvedSubject[]
}

export const useSuiteStore = defineStore('suite', () => {
  async function generate(yaml: string): Promise<GenerationResult> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/suite`
    //return (await axios.post(url, { yaml })).data.data
    return new Promise((resolve) => {
      const generation = subjekt.fromYaml(yaml)
      const result = JSON.parse(generation.resolveSubjectsAsJson().asString())
      const graph = JSON.parse(generation.getGenerationGraph().asString())
      const graphData: GraphData = convertGraph(graph)
      resolve({
        generationGraph: graphData,
        result: result,
      })
    })
  }

  return {
    generate,
  }
})
