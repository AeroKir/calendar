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
    element,
    modalMode = 'create',
    eventData = null,
  }: {
    date: Date
    element: HTMLElement
    modalMode?: ModalMode
    eventData?: CalendarEvent | null
  }) {
    const rect = element.getBoundingClientRect()

    const modalWidth = 260
    const modalHeight = 320
    const padding = 12

    let x = rect.left + 10
    let y = rect.bottom + 6

    if (x + modalWidth > window.innerWidth) {
      x = window.innerWidth - modalWidth - padding
    }

    if (y + modalHeight > window.innerHeight) {
      y = rect.top - modalHeight - 6
    }

    // left overflow
    if (x < padding) {
      x = padding
    }

    // top overflow
    if (y < padding) {
      y = rect.bottom + 6
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
