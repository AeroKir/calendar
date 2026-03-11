<template>
  <div class="p-6 bg-white shadow">
    <h1 class="text-2xl font-bold !mb-6">Calendar View</h1>

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
import { useToast } from '@/composables/useToast'

const store = useEventsStore()
const { openModal } = useEventModal()
const { showToast } = useToast()

onMounted(() => {
  store.load()
})

const calendarEvents = computed(() => store.events)

function isPast(date: Date) {
  const now = new Date()

  const clicked = new Date(date)
  clicked.setHours(0, 0, 0, 0)

  const today = new Date(now)
  today.setHours(0, 0, 0, 0)

  return clicked < today
}

function handleDateClick(info: any) {
  if (isPast(info.date)) {
    showToast('Cannot create events in the past')
    return
  }

  openModal({
    date: info.date,
    element: info.dayEl,
    modalMode: 'create',
  })
}

function handleEventClick(info: any) {
  const event = info.event

  openModal({
    date: event.start,
    element: info.el,
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
  if (info.event.start < new Date()) {
    showToast('Cannot move events to the past')
    info.revert()
    return
  }

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
  } as const,

  events: calendarEvents.value,

  dateClick: handleDateClick,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
}))
</script>
