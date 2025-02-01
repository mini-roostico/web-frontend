import { reactive } from 'vue'

/**
 * Utility reactive object to handle global events in the application.
 */
export const EventBus = reactive({
  events: {},
  /**
   * Registers a callback for the given event.
   * @param event the event to listen to.
   * @param callback the callback to call when the event is emitted.
   */
  $on(event: string, callback: (data: object) => void) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  },
  /**
   * Emits the given event with the given data.
   * @param event the event to emit.
   * @param data the data to pass to the callbacks.
   */
  $emit(event: string, data?: object) {
    if (this.events[event]) {
      this.events[event].forEach((callback: (data: object) => void) => callback(data))
    }
  },
})
