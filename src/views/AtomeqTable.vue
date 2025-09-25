<script setup lang="ts">
import AtomeqElement from '@/components/AtomeqElement.vue';
import useElements from '@/composables/useElements.ts';
import { computed, onMounted } from 'vue';
import { getElementTable, getRadioactiveElementTable } from '@/helpers/tableUtils.ts';

const { getElements, elements } = useElements();

const elementTable = computed(() => {
  return getElementTable(elements.value);
});

const radioactiveGroup = computed(() => elements.value.filter((element) => element.group === 0));

const radioactiveGroupTable = computed(() => {
  return getRadioactiveElementTable(radioactiveGroup.value);
});

// TODO: this stopped working
// seems like tailwind prunes the classes if it cannot detect them on render
// Lucas said there is a way to stop tailwind from doing that in the config or docs
const determinePosition = (idx: number) => {
  return `col-start-${idx + 4}`;
};

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Periodic Table:</h1>
    <div :key="idx" v-for="(row, idx) in elementTable" class="grid grid-cols-18 gap-1">
      <div :key="idx2" v-for="(element, idx2) in row" class="mb-1">
        <AtomeqElement
          v-if="element"
          class="border-2 rounded h-20 shadow-md p-1"
          :element="element"
        />
      </div>
    </div>
    <div class="mt-4">
      <div :key="idx" v-for="(row, idx) in radioactiveGroupTable" class="grid grid-cols-18 gap-1">
        <div :key="idx2" v-for="(element, idx2) in row" :class="determinePosition(idx2)">
          <AtomeqElement class="border-2 rounded h-20 shadow-md mb-1 p-1" :element="element" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
