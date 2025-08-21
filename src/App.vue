<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AtomeqLayout from '@/layouts/AtomeqLayout.vue'
</script>

<template>
  <AtomeqLayout>
    <template #nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </template>
    <template #content>
      <RouterView />
    </template>
    <template #footer></template>
  </AtomeqLayout>
</template>

<style scoped></style>
