<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppNavigation from './components/AppNavigation.vue'
import AppFooter from './components/AppFooter.vue'

</script>

<template>
  <AppNavigation></AppNavigation>
  <RouterView />
  <AppFooter></AppFooter>
</template>

<style scoped>

</style>
