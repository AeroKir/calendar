import { ref } from 'vue'

interface Toast {
  id: number
  message: string
}

const toasts = ref<Toast[]>([])

let id = 0

export function useToast() {
  function showToast(message: string) {
    const toastId = id++

    toasts.value.push({
      id: toastId,
      message,
    })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toastId)
    }, 3000)
  }

  return {
    toasts,
    showToast,
  }
}
