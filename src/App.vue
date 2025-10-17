<script setup lang="ts">
import { RouterView } from 'vue-router';
import AtomeqLayout from '@/layouts/AtomeqLayout.vue';
import AtomeqNav from '@/components/AtomeqNav.vue';
</script>

<template>
  <AtomeqLayout>
    <template #nav>
      <AtomeqNav :isAuthed="true" />
    </template>
    <template #content>
      <RouterView />
    </template>
    <template #footer></template>
  </AtomeqLayout>
</template>

<style scoped></style>
