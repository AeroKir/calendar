import { defineStore } from 'pinia'
import type { CalendarEvent } from '@/types/CalendarEvent'

const STORAGE_KEY = 'calendar-events'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as CalendarEvent[],
  }),

  actions: {
    load() {
      const data = localStorage.getItem(STORAGE_KEY)

      if (!data) return

      try {
        this.events = JSON.parse(data)
      } catch {
        this.events = []
      }
    },

    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events))
    },

    addEvent(event: CalendarEvent) {
      this.events.push(event)

      this.save()
    },

    updateEvent(updated: CalendarEvent) {
      const index = this.events.findIndex((e) => e.id === updated.id)

      if (index === -1) return

      this.events[index] = updated

      this.save()
    },

    deleteEvent(id: string) {
      this.events = this.events.filter((e) => e.id !== id)

      this.save()
    },
  },
})
