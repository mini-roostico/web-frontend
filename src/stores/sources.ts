import { defineStore } from 'pinia'
import { getYamlFromSuite, Source, Suite } from '@/commons/model.ts'
import { apiEndpoints } from '@/commons/globals.ts'
import axios from 'axios'

/**
 * Converts the given source object to the Source object.
 * @param source the source object to convert, obtained from the API.
 */
function toEditorSource(source: object): Source {
  const sourceObj = {}
  const subjects = source['subjects'] ?? []
  const parameters = source['parameters'] ?? []
  const macros = source['macros'] ?? []
  const configuration = source['configuration'] ?? new Map()
  const last_update = new Date(source['last_update'])
  if (source['name']) {
    sourceObj['name'] = source['name']
  } else {
    throw new Error('Source name is missing')
  }
  const { yaml } = getYamlFromSuite(source['name'], configuration, parameters, macros, subjects)
  return {
    _id: source['_id'],
    name: source['name'],
    lastModified: last_update,
    yaml: yaml,
  }
}

/**
 * Store for the sources, utility for handling the CRUD operations of the sources.
 */
export const useSourceStore = defineStore('source', () => {
  /**
   * Get all the sources.
   */
  async function getSources(): Promise<Source[]> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    return (await axios.get(url)).data.data.map(toEditorSource)
  }

  /**
   * Get a source by its identifier.
   * @param id the identifier of the source.
   */
  async function getSource(id: string): Promise<Source> {
    const sources = await getSources()
    return sources.find((source) => source._id === id)
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
    return (await axios.post(url, source)).data.data
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
   * @param suite the suite contained in the source to save.
   */
  async function saveSource(id: string, suite: Suite): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    return (await axios.put(url, { data: { _id: id, data: suite } })).data.data
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
