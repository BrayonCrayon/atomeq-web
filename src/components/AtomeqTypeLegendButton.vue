<script setup lang="ts">
import { AtomeqElementType } from '@/types/elementType.ts';

defineProps<{
  type: AtomeqElementType;
  selectedTypes: number[];
}>();

const emits = defineEmits<{
  hover: [AtomeqElementType];
  hoverLeave: [AtomeqElementType];
  click: [AtomeqElementType];
}>();
</script>

<template>
  <div
    :id="`type-${type.id}`"
    class="border-2 p-2 text-sm text-center capitalize cursor-pointer rounded mb-0.5"
    :class="[
      type.colour,
      type.highlight,
      {
        [type.highlight.replace('hover:', '')]:
          selectedTypes.length && selectedTypes.includes(type.id),
      },
    ]"
    @mouseover="emits('hover', type)"
    @mouseleave="emits('hoverLeave', type)"
    @click="emits('click', type)"
  >
    {{ type.name }}
  </div>
</template>
