import { defineStore } from 'pinia'
import { convertGraph, GraphData } from '@/commons/graph.ts'
import { GenerationResult, Suite } from '@/commons/model.ts'
import { apiEndpoints } from '@/commons/globals.ts'
import axios from 'axios'
import { convertToSubjects } from '@/commons/utils.ts'

/**
 * Store for the suite, utility for handling the generation of the suite.
 */
export const useSuiteStore = defineStore('suite', () => {
  /**
   * Runs a Subjekt generation using the provided Suite configuration.
   * @param suite The suite configuration to use for the generation.
   */
  async function generate(suite: Suite): Promise<GenerationResult> {
    const url = `${apiEndpoints.API_SERVER}/sources/submit`
    const { resolvedSubjects, generationGraph } = (await axios.post(url, suite)).data.data
    const convertedSubjects = convertToSubjects(resolvedSubjects)
    const convertedGraph: GraphData = convertGraph(generationGraph)
    return {
      generationGraph: convertedGraph,
      resolvedSubjects: convertedSubjects,
    }
  }

  return {
    generate,
  }
})
