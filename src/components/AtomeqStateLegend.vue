<script setup lang="ts">
import { useStates } from '@/composables/useStates.ts';
import { onMounted } from 'vue';

const { getStates, states } = useStates();

onMounted(async () => {
  await getStates();
});
</script>

<template></template>

<style scoped></style>
