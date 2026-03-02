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
  hoverLeave: [AtomeqElementType];
  click: [AtomeqElementType];
}>();
</script>

<template>
  <div v-for="[parent, children] in getFormattedTypes()" :key="parent.id">
    <div
      :id="`parent-${parent.id}`"
      class="bg-amber-500 border-2 p-2 text-sm text-center capitalize cursor-pointer rounded mb-0.5 hover:bg-amber-200"
      @mouseover="emits('hover', parent)"
      @mouseleave="emits('hoverLeave', parent)"
      @click="emits('click', parent)"
    >
      {{ parent.name }}
    </div>
    <div
      :class="{
        'grid grid-cols-3 gap-0.5': children.length > 2,
        'flex flex-col gap-0.5': children.length <= 2,
      }"
    >
      <div
        v-for="child in children"
        :key="child.id"
        :id="`child-${child.id}`"
        class="bg-amber-700 border-2 p-2 text-xs text-center capitalize cursor-pointer rounded hover:bg-amber-500"
        @mouseover="emits('hover', child)"
        @mouseleave="emits('hoverLeave', child)"
        @click="emits('click', child)"
      >
        {{ child.name }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
