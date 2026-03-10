import { ref } from 'vue'
import type { CalendarEvent } from '@/types/CalendarEvent'

type ModalMode = 'create' | 'edit'

const isOpen = ref(false)
const mode = ref<ModalMode>('create')

const position = ref({ x: 0, y: 0 })

const selectedDate = ref<Date | null>(null)
const selectedEvent = ref<CalendarEvent | null>(null)

const modalRef = ref<HTMLElement | null>(null)

export function useEventModal() {
  function openModal({
    date,
    mouseEvent,
    modalMode = 'create',
    eventData = null,
  }: {
    date: Date
    mouseEvent: MouseEvent
    modalMode?: ModalMode
    eventData?: CalendarEvent | null
  }) {
    const padding = 20

    let x = mouseEvent.pageX
    let y = mouseEvent.pageY

    if (x + 260 > window.innerWidth) {
      x = window.innerWidth - 260 - padding
    }

    if (y + 200 > window.innerHeight) {
      y = window.innerHeight - 200 - padding
    }

    position.value = { x, y }

    mode.value = modalMode
    selectedDate.value = date
    selectedEvent.value = eventData

    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
  }

  function handleClickOutside(e: MouseEvent) {
    if (!modalRef.value) return

    if (!modalRef.value.contains(e.target as Node)) {
      closeModal()
    }
  }

  document.addEventListener('mousedown', handleClickOutside)

  return {
    isOpen,
    mode,
    position,
    selectedDate,
    selectedEvent,
    modalRef,
    openModal,
    closeModal,
  }
}
