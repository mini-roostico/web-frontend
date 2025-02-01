import { defineStore } from 'pinia'
import { io } from '@mini-roostico/subjekt'
import subjekt = io.github.subjekt.Subjekt
import { convertGraph, GraphData } from '@/commons/graph.ts'
import { convertToSubjects } from '@/commons/utils.ts'
import { GenerationResult } from '@/commons/model.ts'

/**
 * Store for the suite, utility for handling the generation of the suite.
 */
export const useSuiteStore = defineStore('suite', () => {
  /**
   * Runs a Subjekt generation using the Suite configuration contained in the given YAML.
   * @param yaml the YAML content of the Suite.
   */
  async function generate(yaml: string): Promise<GenerationResult> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/suite`
    //return (await axios.post(url, { yaml })).data.data
    return new Promise((resolve) => {
      const generation = subjekt.fromYaml(yaml)
      const result = JSON.parse(generation.resolveSubjectsAsJson().asString()) as Array<object>
      const graph = JSON.parse(generation.getGenerationGraph().asString())
      const graphData: GraphData = convertGraph(graph)
      const resultData = convertToSubjects(result)
      resolve({
        generationGraph: graphData,
        result: resultData,
      })
    })
  }

  return {
    generate,
  }
})
