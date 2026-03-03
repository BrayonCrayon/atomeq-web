<script setup lang="ts">
import AtomeqTypeLegendButton from '@/components/AtomeqTypeLegendButton.vue';
import { useTypes } from '@/composables/useTypes.ts';
import type { AtomeqElementType } from '@/types/elementType.ts';
import { onMounted } from 'vue';

const { getTypes, getFormattedTypes } = useTypes();

onMounted(async () => {
  await getTypes();
});

const emits = defineEmits<{
  hover: [AtomeqElementType];
  hoverLeave: [AtomeqElementType];
  click: [AtomeqElementType];
}>();

defineProps<{
  selectedTypes: number[];
}>();
</script>

<template>
  <div v-for="[parent, children] in getFormattedTypes()" :key="parent.id">
    <AtomeqTypeLegendButton
      @hover="emits('hover', parent)"
      @hoverLeave="emits('hoverLeave', parent)"
      @click="emits('click', parent)"
      :type="parent"
      :selectedTypes="selectedTypes"
    />
    <div
      :class="{
        'grid grid-cols-3 gap-0.5': children.length > 2,
        'flex flex-col gap-0.5 ': children.length <= 2,
      }"
    >
      <div
        v-for="child in children"
        :key="child.id"
        :id="`child-${child.id}`"
        class="border-2 p-2 text-xs text-center capitalize cursor-pointer rounded"
        :class="[
          child.colour,
          child.highlight,
          {
            [child.highlight.replace('hover:', '')]: selectedTypes.includes(child.id),
          },
        ]"
        @mouseover="emits('hover', child)"
        @mouseleave="emits('hoverLeave', child)"
        @click="emits('click', child)"
      >
        {{ child.name }}
      </div>
    </div>
  </div>
</template>
