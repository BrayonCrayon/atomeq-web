<script setup lang="ts">
import { Ban, Check } from 'lucide-vue-next';
import { Variant } from '@/types/common.ts';

defineProps<{
  text: string;
  variant?: Variant;
}>();
</script>

<template>
  <div
    class="flex gap-2 rounded-full px-4 py-0.5 items-center"
    :class="{
      'bg-error-badge-500': variant === Variant.DANGER,
      'bg-green-500': variant === Variant.SUCCESS,
    }"
  >
    <p>{{ text }}</p>
    <Check v-if="variant === Variant.SUCCESS" :size="18" />
    <Ban v-else :size="18" />
  </div>
</template>

<style scoped></style>
