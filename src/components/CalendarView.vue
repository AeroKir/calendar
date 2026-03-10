<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Calendar</h1>

    <FullCalendar :options="calendarOptions" />

    <EventModal />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import EventModal from './EventModal.vue'

import { useEventModal } from '@/composables/useEventModal'
import { useEventsStore } from '@/stores/eventsStore'

const store = useEventsStore()
const { openModal } = useEventModal()

onMounted(() => {
  store.load()
})

const calendarEvents = computed(() => store.events)

function handleDateClick(info: any) {
  openModal({
    date: info.date,
    mouseEvent: info.jsEvent,
    modalMode: 'create',
  })
}

function handleEventClick(info: any) {
  const event = info.event

  openModal({
    date: event.start,
    mouseEvent: info.jsEvent,
    modalMode: 'edit',
    eventData: {
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      color: event.backgroundColor,
    },
  })
}

function handleEventDrop(info: any) {
  store.updateEvent({
    id: info.event.id,
    title: info.event.title,
    start: info.event.start.toISOString(),
    color: info.event.backgroundColor,
  })
}

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },

  initialView: 'dayGridMonth',

  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: false,
  slotEventOverlap: true,
  eventMaxStack: 3,
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },

  events: calendarEvents.value,

  dateClick: handleDateClick,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
}))
</script>
