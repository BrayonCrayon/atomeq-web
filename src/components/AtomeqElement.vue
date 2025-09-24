<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div class="h-20">
    {{ element?.symbol }}
  </div>
</template>

<style scoped></style>
