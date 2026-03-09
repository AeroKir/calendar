<!-- <template>
  <div>
    <h1>Calendar</h1>
    <FullCalendar :options="calendarOptions"> </FullCalendar>
    <EventModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

function handleEventEdit(info: any) {
  openModal({
    date: info.event.start,
    mouseEvent: info.jsEvent,
    modalMode: 'edit',
    eventData: info.event,
  })
}

// const events = ref([
//   {
//     id: 'a',
//     title: 'my event',
//     start: '2026-03-09',
//   },
//   {
//     id: 'b',
//     title: 'my event2',
//     start: '2026-03-10',
//   },
//   {
//     id: 'c',
//     title: 'my event3',
//     start: '2026-03-11',
//   },
// ])

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  initialView: 'dayGridMonth',
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  events: calendarEvents.value,
  select: function (info: any) {
    // console.log('select', info)
    // console.log('EVENTS ARRAY', events)

    // events.value.push({
    //   id: String(events.value.length + 1),
    //   title: 'new event',
    //   start: info.startStr,
    //   end: info.endStr,
    //   allDay: info.allDay,
    // })
    const calendarApi = info.view.calendar
    calendarApi.unselect() // clear date selection
  },
  unselect: function (info: any) {
    console.log('unselect', info)
  },
  dateClick: function (info) {
    handleDateClick(info)
    // alert('Clicked on: ' + info.dateStr)
    // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
    // alert('Current view: ' + info.view.type)
    // change the day's background color just for fun
    // info.dayEl.style.backgroundColor = 'red'
  },
  eventClick: function (info) {
    console.log('eventClick!!!!', info)
    handleEventEdit(info)
  },
}))
</script>

<style scoped></style> -->

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
  dayMaxEvents: true,

  events: calendarEvents.value,

  dateClick: handleDateClick,
  eventClick: handleEventClick,
  eventDrop: handleEventDrop,
}))
</script>
