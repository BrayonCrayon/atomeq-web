<script setup lang="ts">
import useElements from '@/composables/useElements.ts'
import { onMounted } from 'vue'

const { getElements, elements } = useElements();

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <div>Periodic Table</div>
</template>

<style scoped>

</style>
