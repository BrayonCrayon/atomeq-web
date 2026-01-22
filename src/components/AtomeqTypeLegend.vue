<script setup lang="ts">
import { onMounted } from 'vue';
import { useTypes } from '@/composables/useTypes.ts';

const { types, getTypes } = useTypes();

onMounted(async () => {
  await getTypes();
});
</script>

<template>
  <div v-for="type in types" :key="type.id">
    <h1 v-if="type.parentId === null" class="bg-amber-500">{{ type.name }}</h1>
    <h2 v-else class="bg-amber-700">{{ type.name }}</h2>
  </div>
</template>

<style scoped></style>
