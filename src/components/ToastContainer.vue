<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 space-y-2 transition-all duration-300">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="bg-gray-900 text-white px-4 py-2 rounded shadow-lg"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts } = useToast()
</script>
