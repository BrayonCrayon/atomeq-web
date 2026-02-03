<script setup lang="ts">
import type { AtomeqElementType } from '@/types/elementType.ts';
import { onMounted } from 'vue';
import { useTypes } from '@/composables/useTypes.ts';

const { getTypes, getFormattedTypes } = useTypes();

onMounted(async () => {
  await getTypes();
});

const emits = defineEmits<{
  hover: [AtomeqElementType];
  click: [AtomeqElementType];
}>();
</script>

<!--TODO:
  0. how do I want to handle the design? alignment
  2. turn those into buttons that on hover colour the correct section
-->

<template>
  <div v-for="[parent, children] in getFormattedTypes()" :key="parent.id">
    <div
      :id="`parent-${parent.id}`"
      class="bg-amber-500 border-2 p-2 text-sm text-center capitalize"
      @mouseover="emits('hover', parent)"
      @click="emits('click', parent)"
    >
      {{ parent.name }}
    </div>
    <div
      v-for="child in children"
      :key="child.id"
      :id="`child-${child.id}`"
      class="bg-amber-700 border-2 p-2 text-xs text-center capitalize"
      @mouseover="emits('hover', child)"
      @click="emits('click', child)"
    >
      {{ child.name }}
    </div>
  </div>
</template>

<style scoped></style>
