// import { defineStore } from 'pinia'
// import type { CalendarEvent } from '@/types/CalendarEvent'

// export const useEventsStore = defineStore('events', {
//   state: () => ({
//     events: [] as CalendarEvent[],
//   }),

//   actions: {
//     addEvent(event: CalendarEvent) {
//       this.events.push(event)
//       this.save()
//     },

//     updateEvent(updated: CalendarEvent) {
//       const index = this.events.findIndex((e) => e.id === updated.id)

//       if (index !== -1) {
//         this.events[index] = {
//           ...this.events[index],
//           ...updated,
//         }
//       }

//       this.save()
//     },

//     deleteEvent(id: string) {
//       this.events = this.events.filter((e) => e.id !== id)
//       this.save()
//     },

//     save() {
//       localStorage.setItem('calendar-events', JSON.stringify(this.events))
//     },

//     load() {
//       const data = localStorage.getItem('calendar-events')

//       if (data) {
//         this.events = JSON.parse(data)
//       }
//     },
//   },
// })

import { defineStore } from 'pinia'
import type { CalendarEvent } from '@/types/CalendarEvent'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as CalendarEvent[],
  }),

  actions: {
    load() {
      const data = localStorage.getItem('calendar-events')

      if (data) {
        this.events = JSON.parse(data)
      }
    },

    save() {
      localStorage.setItem('calendar-events', JSON.stringify(this.events))
    },

    addEvent(event: CalendarEvent) {
      this.events.push(event)

      this.save()
    },

    updateEvent(updated: CalendarEvent) {
      const index = this.events.findIndex((e) => e.id === updated.id)

      if (index !== -1) {
        this.events[index] = updated
      }

      this.save()
    },

    deleteEvent(id: string) {
      this.events = this.events.filter((e) => e.id !== id)

      this.save()
    },
  },
})
