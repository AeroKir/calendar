<template>
  <div
    v-if="isOpen"
    ref="modalRef"
    class="fixed z-50 bg-white shadow-xl rounded-lg p-4 w-64"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
  >
    <div class="flex justify-between mb-2">
      <span class="font-semibold">
        {{ isEditMode ? 'Edit Event' : 'New Event' }}
      </span>

      <button @click="closeModal">✕</button>
    </div>

    <div class="text-sm text-gray-500 mb-3">
      {{ selectedDate }}
    </div>

    <input
      v-model="title"
      class="border rounded w-full p-1 mb-3"
      placeholder="Event title"
      maxlength="30"
    />
    <span v-if="error" class="text-red-500 text-xs mb-2">
      {{ error }}
    </span>
    <span class="ml-auto"> {{ titleLength }} / {{ maxTitleLength }} </span>

    <div class="mb-2">
      <label class="text-sm">Date</label>

      <input type="date" v-model="date" class="border rounded w-full p-1" />
    </div>

    <div class="mb-2">
      <label class="text-sm">Start time</label>

      <input type="time" v-model="startTime" class="border rounded w-full p-1" />
    </div>

    <div class="mb-2">
      <label class="text-sm">End time (optional)</label>

      <input type="time" v-model="endTime" :min="startTime" class="border rounded w-full p-1" />
    </div>

    <div class="mb-3">
      <label class="text-sm">Event color</label>

      <input type="color" v-model="color" class="w-full h-10 cursor-pointer" />
    </div>

    <div v-if="isEditMode" class="flex gap-2">
      <button @click="discardChanges" class="bg-gray-400 text-white px-3 py-1 rounded">
        Discard
      </button>

      <button @click="deleteEvent" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>

      <button @click="updateEvent" class="bg-indigo-500 text-white px-3 py-1 rounded">
        Update
      </button>
    </div>

    <div v-else class="flex gap-2">
      <button @click="closeModal" class="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>

      <button @click="saveEvent" class="bg-indigo-500 text-white px-3 py-1 rounded">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useEventModal } from '@/composables/useEventModal'
import { useEventsStore } from '@/stores/eventsStore'
import { v4 as uuid } from 'uuid'

import { validateTitle } from '@/utils/validateTitle'
import { useToast } from '@/composables/useToast'

const { isOpen, mode, position, selectedDate, selectedEvent, modalRef, closeModal } =
  useEventModal()

const store = useEventsStore()
const { showToast } = useToast()

const isEditMode = computed(() => mode.value === 'edit')

const title = ref('')
const color = ref('#6366f1')
const date = ref<string>('')
const startTime = ref<string>('09:00')
const endTime = ref<string>('10:00')
const error = ref('')

const titleLength = computed(() => title.value.length)
const maxTitleLength = 30

watch(selectedEvent, (event) => {
  if (event) {
    title.value = event.title || ''
    color.value = event.color || '#6366f1'

    const start = new Date(event.start)

    date.value = start.toISOString().split('T')[0]
    startTime.value = start.toTimeString().slice(0, 5)

    if (event.end) {
      const end = new Date(event.end)
      endTime.value = end.toTimeString().slice(0, 5)
    }
  } else {
    title.value = ''
    endTime.value = ''
    color.value = '#6366f1'

    if (selectedDate.value) {
      date.value = selectedDate.value.toISOString().split('T')[0]
    }
  }
})

function buildDateTime(date: string, time: string) {
  return new Date(`${date}T${time}`).toISOString()
}

function handleScroll() {
  closeModal()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

function saveEvent() {
  error.value = ''

  const validationError = validateTitle(title.value)

  if (validationError) {
    error.value = validationError
    return
  }

  const start = buildDateTime(date.value, startTime.value)

  const end = endTime.value ? buildDateTime(date.value, endTime.value) : undefined

  if (end && new Date(end) < new Date(start)) {
    error.value = 'End time must be after start time'
    return
  }

  store.addEvent({
    id: uuid(),
    title: title.value,
    start,
    end,
    color: color.value,
  })

  showToast('Event created successfully')
  closeModal()
}

function updateEvent() {
  if (!selectedEvent.value) return

  const validationError = validateTitle(title.value)

  if (validationError) {
    error.value = validationError
    return
  }

  const start = buildDateTime(date.value, startTime.value)

  const end = endTime.value ? buildDateTime(date.value, endTime.value) : undefined

  if (end && new Date(end) < new Date(start)) {
    error.value = 'End time must be after start time'
    return
  }

  store.updateEvent({
    ...selectedEvent.value,
    title: title.value,
    start,
    end,
    color: color.value,
  })

  showToast('Event updated successfully')
  closeModal()
}

function deleteEvent() {
  if (!selectedEvent.value) return

  store.deleteEvent(selectedEvent.value.id)

  showToast('Event deleted successfully')
  closeModal()
}

function discardChanges() {
  title.value = selectedEvent.value?.title ?? ''
  color.value = selectedEvent.value?.color ?? '#6366f1'
  closeModal()
}
</script>
