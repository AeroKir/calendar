<template>
  <header class="header">
    <img :src="SearchIcon" alt="Search" />
    <input class="search" placeholder="Search transactions, invoices or help" />

    <div class="user">
      <img :src="HelpIcon" alt="Help" />
      John Doe
      <img :src="Avatar" alt="Avatar" />
    </div>
  </header>
</template>

<script setup lang="ts">
import HelpIcon from './icons/IconHelp.svg'
import SearchIcon from './icons/IconSearch.svg'
import Avatar from './icons/Avatar.png'
</script>

<style scoped>
.header {
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 20px;
  border-bottom: 1px solid #eee;
}

.search {
  /* flex: 1; */
  width: 20%;
  padding: 6px 10px;
}

.user {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}
</style>
