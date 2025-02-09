import { defineStore } from 'pinia'
import { Source } from '@/commons/model.ts'
import { apiEndpoints } from '@/commons/globals.ts'
import axios from 'axios'

/**
 * Store for the sources, utility for handling the CRUD operations of the sources.
 */
export const useSourceStore = defineStore('source', () => {
  /**
   * Get all the sources.
   */
  async function getSources(): Promise<Source[]> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    return (await axios.get(url)).data.data
  }

  /**
   * Get a source by its identifier.
   * @param id the identifier of the source.
   */
  async function getSource(id: string): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    return (await axios.get(url)).data.data
  }

  /**
   * Create a new source.
   * @param name the name of the source.
   */
  async function createSource(name: string): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    const source = {
      name: name,
      subjects: [
        {
          name: 'Subjekt 1',
        },
      ],
    }

    const res = (await axios.post(url, source)).data.data
    return res
  }

  /**
   * Rename a source.
   * @param id the identifier of the source.
   * @param name the new name of the source.
   */
  async function renameSource(id: string, name: string): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    return (await axios.put(url, { data: { _id: id, name } })).data.data
  }

  /**
   * Delete a source.
   * @param id the identifier of the source.
   */
  async function deleteSource(id: string): Promise<void> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    await axios.delete(url, { data: { data: { _id: id } } })
  }

  /**
   * Save the source.
   * @param id the identifier of the source.
   * @param name the new name of the source.
   * @param yaml the new YAML content of the source.
   */
  async function saveSource(id: string, name: string, yaml: string): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    return (await axios.put(url, { name, yaml })).data.data
  }

  return {
    getSources,
    getSource,
    createSource,
    renameSource,
    deleteSource,
    saveSource,
  }
})
