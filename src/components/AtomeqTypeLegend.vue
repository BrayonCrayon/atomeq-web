<script setup lang="ts">
import { onMounted } from 'vue';
import { useTypes } from '@/composables/useTypes.ts';

const { types, getTypes } = useTypes();

onMounted(async () => {
  await getTypes();
});
</script>

<template>
  <h1>Legendary</h1>
  <div v-for="type in types" :key="type.id">
    <h2>{{ type.name }}</h2>
  </div>
</template>

<style scoped></style>
