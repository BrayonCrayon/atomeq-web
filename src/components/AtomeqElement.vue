<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div class="h-20 content-center bg-blue-200">
    <div class="justify-self-center text-lg font-bold">
      {{ element?.symbol }}
    </div>
  </div>
</template>

<style scoped></style>
