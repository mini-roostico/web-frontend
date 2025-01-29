import { defineStore } from 'pinia'

export interface Source {
  id: number
  name: string
  lastModified: Date
}

export const useSourceStore = defineStore('source', () => {
  // TODO remove
  const dummySources: Source[] = [
    {
      id: 1,
      name: 'Source 1',
      lastModified: new Date(),
    },
    {
      id: 2,
      name: 'Source 2',
      lastModified: new Date(),
    },
  ]

  async function getSources(): Promise<Source[]> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources`
    //return (await axios.get(url)).data.data
    return new Promise((resolve) => {
      resolve(dummySources)
    })
  }

  async function getSource(id: number): Promise<Source> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    //return (await axios.get(url)).data.data
    return new Promise((resolve) => {
      resolve(dummySources.find((source) => source.id === id))
    })
  }

  async function createSource(name: string): Promise<Source> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources`
    //return (await axios.post(url, { name })).data.data
    return new Promise((resolve) => {
      const newSource = {
        id: dummySources.length + 1,
        name,
        lastModified: new Date(),
      }
      dummySources.push(newSource)
      resolve(newSource)
    })
  }

  async function renameSource(id: number, name: string): Promise<Source> {
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

  async function deleteSource(id: number): Promise<void> {
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

  return {
    getSources,
    getSource,
    createSource,
    renameSource,
    deleteSource,
  }
})
