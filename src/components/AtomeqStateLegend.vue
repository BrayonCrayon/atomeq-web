<script setup lang="ts">
import { useStates } from '@/composables/useStates.ts';
import type { ElementState } from '@/types/elementState.ts';
import { onMounted } from 'vue';

const { getStates, states } = useStates();

onMounted(async () => {
  await getStates();
});

const emits = defineEmits<{
  hover: [ElementState];
  hoverLeave: [ElementState];
  click: [ElementState];
}>();

defineProps<{
  selectedStates: number[];
}>();
</script>

<template>
  <div v-for="state in states" :key="state.id">
    <div
      :id="`state-${state.id}`"
      class="border-2 p-2 text-sm text-center capitalize cursor-pointer rounded mb-0.5"
      :class="[
        state.colour,
        state.hover,
        {
          [state.highlight]: selectedStates.includes(state.id),
        },
      ]"
      @mouseover="emits('hover', state)"
      @mouseleave="emits('hoverLeave', state)"
      @click="emits('click', state)"
    >
      {{ state.name }}
    </div>
  </div>
</template>

<style scoped></style>
