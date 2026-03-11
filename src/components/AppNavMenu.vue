<template>
  <aside :class="['sidebar', collapsed ? 'collapsed' : 'open']">
    <!-- TOP BAR -->
    <div class="sidebar-top" @click="$emit('toggleSidebar')">
      <span v-if="!collapsed" class="logo"> IMPECABLE </span>

      <span v-else class="hamburger"> ☰ </span>
    </div>

    <!-- NAVIGATION -->
    <nav class="nav">
      <RouterLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="nav-link"
        active-class="active"
      >
        <img :src="link.icon" />

        <span v-if="!collapsed">
          {{ link.name }}
        </span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HomeIcon from './icons/IconHome.svg'
import InboxIcon from './icons/IconInbox.svg'
import CalendarIcon from './icons/IconCalendar.svg'
import HelpIcon from './icons/IconHelp.svg'
import SettingsIcon from './icons/IconSettings.svg'

defineProps<{
  collapsed: boolean
}>()

defineEmits(['toggleSidebar'])

const navLinks = [
  { name: 'Home', path: '/', icon: HomeIcon },
  // { name: 'About', path: '/about', icon: HomeIcon },
  { name: 'Inbox', path: '/inbox', icon: InboxIcon },
  { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
  { name: 'Help Center', path: '/help', icon: HelpIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
]
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #43425d;
  color: white;
  transition: width 0.25s;
}

.open {
  width: 220px;
}

.collapsed {
  width: 70px;
}

/* TOP BLOCK */

.sidebar-top {
  height: 70px;
  width: 100%;
  background: #343347;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  font-size: 18px;
  letter-spacing: 1px;
}

.hamburger {
  font-size: 22px;
}

/* NAV */

.nav {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 6px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  text-decoration: none;
  color: white;
}

.nav-link:hover {
  background: #343347;
}

.active {
  background: #343347;
}

.nav-link img {
  width: 18px;
}
</style>
