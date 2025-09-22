<script setup lang="ts">
import useElements from '@/composables/useElements.ts';
import { computed, onMounted } from 'vue';
import { getElementTable } from '@/helpers/tableUtils.ts';

const { getElements, elements } = useElements();

const elementTable = computed(() => {
  return getElementTable(elements.value);
});

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Periodic Table:</h1>
    <div :key="idx" v-for="(row, idx) in elementTable" class="grid grid-cols-18 gap-2">
      <div :key="idx2" v-for="(element, idx2) in row" class="border-2 rounded h-20 shadow-md">
        {{ element?.symbol ?? 'none' }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
