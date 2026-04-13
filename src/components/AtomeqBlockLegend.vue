<script setup lang="ts">
import { useStates } from '@/composables/useStates.ts';
import { ElementBlock } from '@/types/element.ts';
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
  selectedBlocks: ElementBlock[];
}>();
</script>

<template>
  <div v-for="block in Object.values(ElementBlock)" :key="block">
    <div
      :id="`block-${block}`"
      class="border-2 p-2 text-sm text-center capitalize cursor-pointer rounded mb-0.5"
    >
      <!--      :class="[-->
      <!--      state.colour,-->
      <!--      state.highlight,-->
      <!--      {-->
      <!--      [state.highlight.replace('hover:', '')]: selectedBlocks.includes(state.id),-->
      <!--      },-->
      <!--      ]"-->
      <!--      @mouseover="emits('hover', state)"-->
      <!--      @mouseleave="emits('hoverLeave', state)"-->
      <!--      @click="emits('click', state)"-->
      {{ block }}
    </div>
  </div>
</template>

<style scoped></style>
