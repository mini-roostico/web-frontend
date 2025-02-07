import { defineStore } from 'pinia'
import { Source } from '@/commons/model.ts'

/**
 * Store for the sources, utility for handling the CRUD operations of the sources.
 */
export const useSourceStore = defineStore('source', () => {
  // TODO remove
  const dummySources: Source[] = [
    {
      id: '1',
      name: 'Source 1',
      lastModified: new Date(),
      yaml: `
      name: "Source 1"
      parameters:
        - name: "param1"
          values:
          - "value1"
          - "value2"
        - name: "param2"
          values:
          - "value3"
          - "value3"
      subjects:
        - name: "Subject Awesome"
          score: 10
        - name: "Subject Bad"
      `,
    },
    {
      id: '2',
      name: 'Source 2',
      lastModified: new Date(),
      yaml: `name: "Source 2"`,
    },
  ]

  /**
   * Get all the sources.
   */
  async function getSources(): Promise<Source[]> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources`
    //return (await axios.get(url)).data.data
    return new Promise((resolve) => {
      resolve(dummySources)
    })
  }

  /**
   * Get a source by its identifier.
   * @param id the identifier of the source.
   */
  async function getSource(id: string): Promise<Source> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    //return (await axios.get(url)).data.data
    return new Promise((resolve) => {
      resolve(dummySources.find((source) => source.id === id))
    })
  }

  /**
   * Create a new source.
   * @param name the name of the source.
   */
  async function createSource(name: string): Promise<Source> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources`
    //return (await axios.post(url, { name })).data.data
    return new Promise((resolve) => {
      const newSource = {
        id: (dummySources.length + 1).toString(),
        name,
        lastModified: new Date(),
        yaml: '',
      }
      dummySources.push(newSource)
      resolve(newSource)
    })
  }

  /**
   * Rename a source.
   * @param id the identifier of the source.
   * @param name the new name of the source.
   */
  async function renameSource(id: string, name: string): Promise<Source> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    //return (await axios.put(url, { name })).data.data
    return new Promise((resolve) => {
      const source = dummySources.find((source) => source.id === id)
      if (source) {
        source.name = name
        source.lastModified = new Date()
      }
      resolve(source)
    })
  }

  /**
   * Delete a source.
   * @param id the identifier of the source.
   */
  async function deleteSource(id: string): Promise<void> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    //await axios.delete(url)
    return new Promise((resolve) => {
      const index = dummySources.findIndex((source) => source.id === id)
      if (index >= 0) {
        dummySources.splice(index, 1)
      }
      resolve()
    })
  }

  /**
   * Save the source.
   * @param id the identifier of the source.
   * @param name the new name of the source.
   * @param yaml the new YAML content of the source.
   */
  async function saveSource(id: string, name: string, yaml: string): Promise<Source> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/suite/${id}`
    //return (await axios.put(url, { name, yaml })).data.data
    return new Promise((resolve) => {
      const source = dummySources.find((source) => source.id === id)!
      source.yaml = yaml
      source.name = name
      source.lastModified = new Date()
      resolve({ id, name, lastModified: new Date(), yaml })
    })
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
