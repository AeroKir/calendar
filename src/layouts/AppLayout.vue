<template>
  <div class="app-layout">
    <AppNavMenu :collapsed="collapsed" @toggleSidebar="collapsed = !collapsed" />

    <div class="main">
      <AppHeader />

      <div class="page">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import AppNavMenu from '@/components/AppNavMenu.vue'
import AppHeader from '@/components/AppHeader.vue'

const collapsed = ref(false)
</script>

<style scoped>
.app-layout {
  display: flex;
  /* height: 100vh; */
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page {
  /* flex: 1; */
  padding: 24px;
  background: #f4f6f9;
}
</style>
