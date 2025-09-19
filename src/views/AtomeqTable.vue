<script setup lang="ts">
import useElements from '@/composables/useElements.ts';
import { onMounted } from 'vue';

const { getElements, elements } = useElements();

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Periodic Table:</h1>
    <div class="grid grid-cols-18 gap-2">
      <div :key="element.id" v-for="element in elements" class="border-2 rounded h-20 shadow-md">
        {{ element.symbol }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
