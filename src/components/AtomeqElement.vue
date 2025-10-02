<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div class="h-20 content-center">
    <div class="flex justify-between text-xs font-bold mb-2">
      <div>
        {{ element?.atomicNumber }}
      </div>
      <div>
        {{ element?.atomicMass }}
      </div>
    </div>
    <div class="justify-self-center text-lg font-bold">
      {{ element?.symbol }}
    </div>
    <div class="justify-self-center text-xs font-bold">
      {{ element?.name }}
    </div>
  </div>
</template>

<style scoped></style>
