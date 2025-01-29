import { defineStore } from 'pinia'

export interface Source {
  id: string
  name: string
  lastModified: Date
  yaml: string
}

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

  async function getSources(): Promise<Source[]> {
    // TODO uncomment
    //const url = `${apiEndpoints.API_SERVER}/sources`
    //return (await axios.get(url)).data.data
    return new Promise((resolve) => {
      resolve(dummySources)
    })
  }

  async function getSource(id: string): Promise<Source> {
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
        id: (dummySources.length + 1).toString(),
        name,
        lastModified: new Date(),
        yaml: '',
      }
      dummySources.push(newSource)
      resolve(newSource)
    })
  }

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
