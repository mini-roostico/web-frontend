import { reactive } from 'vue'

export const EventBus = reactive({
  events: {},
  $on(event: string, callback: (data: object) => void) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  },
  $emit(event: string, data?: object) {
    if (this.events[event]) {
      this.events[event].forEach((callback: (data: object) => void) => callback(data))
    }
  },
})
