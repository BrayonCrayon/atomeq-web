<script setup lang="ts">
import AtomeqElementComponent from '@/components/AtomeqElement.vue';
import useElements from '@/composables/useElements.ts';
import { onMounted } from 'vue';

const { getElements, elements } = useElements();

onMounted(async () => {
  await getElements();
});
</script>
<template>
  <div class="absolute inset-0 top-5/10 overflow-hidden pointer-events-none backdrop-blur-lg">
    <div class="relative inset-0 w-full h-full">
      <div class="w-full h-full z-100 bg-linear-to-t to-slate-50 absolute"></div>
      <div class="grid grid-cols-18 gap-1">
        <div
          :key="`${element?.name}-${element.id}`"
          v-for="element in elements"
          class="mb-1 odd:mt-4"
        >
          <AtomeqElementComponent
            v-if="element"
            class="border-2 rounded h-20 shadow-md p-1 cursor-pointer opacity-50"
            :class="element.typeColour"
            :element="element"
          />
        </div>
      </div>
    </div>
  </div>
</template>
