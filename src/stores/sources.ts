import { defineStore } from 'pinia'
import { apiEndpoints } from '@/commons/globals.ts'
import axios from 'axios'

interface Source {
  id: number
  name: string
  lastModified: Date
}

export const useSourceStore = defineStore('auth', () => {
  async function getSources(): Promise<Source[]> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    return (await axios.get(url)).data.data
  }

  async function getSource(id: number): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    return (await axios.get(url)).data.data
  }

  async function createSource(name: string): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources`
    return (await axios.post(url, { name })).data.data
  }

  async function renameSource(id: number, name: string): Promise<Source> {
    const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    return (await axios.put(url, { name })).data.data
  }

  async function deleteSource(id: number): Promise<void> {
    const url = `${apiEndpoints.API_SERVER}/sources/${id}`
    await axios.delete(url)
  }

  return {
    getSources,
    getSource,
    createSource,
    renameSource,
    deleteSource,
  }
})
