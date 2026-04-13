<script setup lang="ts">
import { ElementBlock, ElementBlockColour } from '@/types/element.ts';

const emits = defineEmits<{
  hover: [ElementBlock];
  hoverLeave: [ElementBlock];
  click: [ElementBlock];
}>();

defineProps<{
  selectedBlocks: ElementBlock[];
}>();
</script>

<!--TODO: slide in the highlighting here and finish up the tests-->
<template>
  <div v-for="block in Object.values(ElementBlock)" :key="block">
    <div
      :id="`block-${block}`"
      class="border-2 p-2 text-sm text-center capitalize cursor-pointer rounded mb-0.5"
      :class="[ElementBlockColour[block]]"
      @mouseover="emits('hover', block)"
      @mouseleave="emits('hoverLeave', block)"
      @click="emits('click', block)"
    >
      {{ block }}
    </div>
  </div>
</template>

<style scoped></style>
