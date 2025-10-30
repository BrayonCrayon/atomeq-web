<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div>{{ element.name }}</div>
</template>

<style scoped></style>
