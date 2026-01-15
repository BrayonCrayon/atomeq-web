<script setup lang="ts">
import { onMounted } from 'vue';
import { useTypes } from '@/composables/useTypes.ts';

const { getTypes } = useTypes();

onMounted(async () => {
  await getTypes();
});
</script>

<template>
  <h1>Legendary</h1>
</template>

<style scoped></style>
