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

    <div v-if="isEditMode" class="flex gap-2">
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
import { ref, computed, watch } from 'vue'
import { useEventModal } from '@/composables/useEventModal'
import { useEventsStore } from '@/stores/eventsStore'
import { v4 as uuid } from 'uuid'

const { isOpen, mode, position, selectedDate, selectedEvent, modalRef, closeModal } =
  useEventModal()

const store = useEventsStore()

const isEditMode = computed(() => mode.value === 'edit')

const title = ref('')

watch(selectedEvent, (event) => {
  if (event) {
    title.value = event.title
  } else {
    title.value = ''
  }
})

function saveEvent() {
  if (!selectedDate.value) return
  if (!title.value.trim()) return

  store.addEvent({
    id: uuid(),
    title: title.value,
    start: selectedDate.value.toISOString(),
    color: '#6366f1',
  })

  closeModal()
}

function updateEvent() {
  if (!selectedEvent.value) return

  store.updateEvent({
    ...selectedEvent.value,
    title: title.value,
  })

  closeModal()
}

function deleteEvent() {
  if (!selectedEvent.value) return

  store.deleteEvent(selectedEvent.value.id)

  closeModal()
}
</script>
