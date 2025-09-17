<script setup lang="ts">
import useElements from '@/composables/useElements.ts'
import { onMounted } from 'vue'

const { getElements, elements } = useElements();

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <h1 class="text-2xl">Periodic Table:</h1>
  <div class="grid grid-cols-18 bg-red-500">
    <div :key="element.id" v-for="element in elements.data" class="border-2 h-20">{{element.symbol}}</div>
  </div>
</template>

<style scoped>

</style>
