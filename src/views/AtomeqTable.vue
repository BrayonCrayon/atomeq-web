<script setup lang="ts">
import AtomeqElementComponent from '@/components/AtomeqElement.vue';
import { AtomeqElement } from '@/types/element';
import useElements from '@/composables/useElements.ts';
import { computed, onMounted, ref } from 'vue';
import { getElementTable, getRadioactiveElementTable } from '@/helpers/tableUtils.ts';
import { Display } from '@/types/atomeq-table.ts';
import SwitchDisplay from '@/components/SwitchDisplay.vue';

const elementDisplay = ref<Display>(Display.TYPE);

const { getElements, elements } = useElements();

const elementTable = computed(() => {
  return getElementTable(elements.value);
});

const radioactiveGroup = computed(() => elements.value.filter((element) => element.group === 0));

const radioactiveGroupTable = computed(() => {
  return getRadioactiveElementTable(radioactiveGroup.value);
});

const columnPosition = (idx: number) => {
  const elementPosition: Record<number, string> = {
    0: 'col-start-4',
    1: 'col-start-5',
    2: 'col-start-6',
    3: 'col-start-7',
    4: 'col-start-8',
    5: 'col-start-9',
    6: 'col-start-10',
    7: 'col-start-11',
    8: 'col-start-12',
    9: 'col-start-13',
    10: 'col-start-14',
    11: 'col-start-15',
    12: 'col-start-16',
    13: 'col-start-17',
    14: 'col-start-18',
  };

  return elementPosition[idx];
};

const displayColour = (element: AtomeqElement) => {
  return {
    [`${element.typeColour}`]: elementDisplay.value === Display.TYPE,
    [`${element.stateColour}`]: elementDisplay.value === Display.STATE,
  };
};

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Periodic Table:</h1>
    <div class="flex gap-2">
      <SwitchDisplay v-model="elementDisplay" />
    </div>
    <div :key="idx" v-for="(row, idx) in elementTable" class="grid grid-cols-18 gap-1">
      <div :key="`${element?.name}-${idx2}`" v-for="(element, idx2) in row" class="mb-1">
        <AtomeqElementComponent
          v-if="element"
          class="border-2 rounded h-20 shadow-md p-1"
          :class="displayColour(element)"
          :element="element"
        />
      </div>
    </div>
    <div class="mt-4">
      <div :key="idx" v-for="(row, idx) in radioactiveGroupTable" class="grid grid-cols-18 gap-1">
        <div v-for="(element, idx2) in row" :key="element.id" :class="columnPosition(idx2)">
          <AtomeqElementComponent
            class="border-2 rounded h-20 shadow-md mb-1 p-1"
            :class="displayColour(element)"
            :element="element"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
