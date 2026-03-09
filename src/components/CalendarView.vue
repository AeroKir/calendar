<template>
  <div>
    <h1>Calendar</h1>
    <FullCalendar :options="calendarOptions" @eventClick="onEventClick" @dateClick="onDateClick">
      <template v-slot:eventContent="arg">
        <b>{{ arg.event.title }}</b>
        <div>123</div>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { log } from 'console'

const events = [
  {
    id: 'a',
    title: 'my event',
    start: '2026-03-09',
  },
  {
    id: 'b',
    title: 'my event2',
    start: '2026-03-10',
  },
  {
    id: 'c',
    title: 'my event3',
    start: '2026-03-11',
  },
]

const calendarOptions = {
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
  events: events,
  select: function (info: any) {
    console.log('select', info)
    console.log('EVENTS ARRAY', events)

    events.push({
      id: String(events.length + 1),
      title: 'new event',
      start: info.startStr,
      end: info.endStr,
      allDay: info.allDay,
    })
    const calendarApi = info.view.calendar
    calendarApi.unselect() // clear date selection
  },
  dateClick: function (info) {
    alert('Clicked on: ' + info.dateStr)
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
    alert('Current view: ' + info.view.type)
    // change the day's background color just for fun
    info.dayEl.style.backgroundColor = 'red'
  },
}

const onEventClick = (info: any) => {
  console.log(info.event)
}

const onDateClick = (info: any) => {
  console.log(info.dateStr)
}
</script>

<style scoped></style>
