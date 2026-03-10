<template>
  <nav>
    <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path">
      {{ link.name }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Calendar', path: '/calendar' },
]
</script>

<style scoped></style>
