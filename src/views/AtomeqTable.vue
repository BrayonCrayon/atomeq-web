<script setup lang="ts">
import AtomeqBlockLegend from '@/components/AtomeqBlockLegend.vue';
import AtomeqElementComponent from '@/components/AtomeqElement.vue';
import AtomeqStateLegend from '@/components/AtomeqStateLegend.vue';
import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import { useTypes } from '@/composables/useTypes.ts';
import { Element, ElementBlock } from '@/types/element';
import useElements from '@/composables/useElements.ts';
import type { ElementState } from '@/types/elementState.ts';
import type { AtomeqElementType } from '@/types/elementType.ts';
import { pull, pullAll } from 'lodash';
import { computed, onMounted, ref } from 'vue';
import { getElementTable, getRadioactiveElementTable } from '@/helpers/tableUtils.ts';
import { Display } from '@/types/atomeq-table.ts';
import SwitchDisplay from '@/components/SwitchDisplay.vue';
import AtomeqElementModal from '@/components/modals/AtomeqElementModal.vue';

const elementDisplay = ref<Display>(Display.TYPE);
const selectedElement = ref<Element | undefined>(undefined);
const hoveredTypes = ref<number[]>([]);
const hoveredState = ref<number | undefined>(undefined);
const hoveredBlock = ref<string | undefined>(undefined);
const selectedTypes = ref<number[]>([]);
const selectedStates = ref<number[]>([]);
const selectedBlocks = ref<ElementBlock[]>([]);

const { getElements, elements } = useElements();
const { getTypes, types } = useTypes();

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

const displayColour = (element: Element) => {
  return {
    [`${element.typeColour}`]: elementDisplay.value === Display.TYPE,
    [`${element.stateColour}`]: elementDisplay.value === Display.STATE,
    [`${element.blockColour}`]: elementDisplay.value === Display.BLOCK,
  };
};

const shouldFade = (element: Element): boolean => {
  const isHovered = hoveredTypes.value.length > 0 && hoveredTypes.value.includes(element.typeId);
  const isSelected = selectedTypes.value.length > 0 && selectedTypes.value.includes(element.typeId);

  return (
    (hoveredTypes.value.length > 0 || selectedTypes.value.length > 0) && !isHovered && !isSelected
  );
};

const shouldFadeOnState = (element: Element): boolean => {
  const isHovered = !!hoveredState.value && hoveredState.value === element.elementStateId;
  const isSelected =
    selectedStates.value.length > 0 && selectedStates.value.includes(element.elementStateId);

  return (!!hoveredState.value || selectedStates.value.length > 0) && !isHovered && !isSelected;
};

const hoverOnType = (type: AtomeqElementType): void => {
  if (type.parentId === null) {
    const children = types.value.filter((item) => item.parentId === type.id);
    children.forEach((child) => hoveredTypes.value.push(child.id));
  }

  hoveredTypes.value.push(type.id);
};

const selectAndDeselectTypes = (type: AtomeqElementType): void => {
  const children = !type.parentId ? types.value.filter((item) => item.parentId === type.id) : [];

  if (selectedTypes.value.includes(type.id)) {
    pullAll(selectedTypes.value, [type.id, ...children.map((item) => item.id)]);
    return;
  }

  children.forEach((child) => selectedTypes.value.push(child.id));

  selectedTypes.value.push(type.id);
};

const selectAndDeselectStates = (state: ElementState): void => {
  if (selectedStates.value.includes(state.id)) {
    pull(selectedStates.value, state.id);
    return;
  }

  selectedStates.value.push(state.id);
};

const selectAndDeselectBlocks = (block: ElementBlock): void => {
  if (selectedBlocks.value.includes(block)) {
    pull(selectedBlocks.value, block);
    return;
  }

  selectedBlocks.value.push(block);
};

onMounted(async () => {
  await getElements();
  await getTypes();
});
</script>

<template>
  <div class="p-4">
    <AtomeqElementModal
      :show="!!selectedElement"
      :element="selectedElement"
      @close="selectedElement = undefined"
    />
    <div class="flex gap-6 justify-center">
      <div>
        <SwitchDisplay v-model="elementDisplay" />
      </div>
      <div class="flex justify-center gap-0.5">
        <AtomeqTypeLegend
          v-if="elementDisplay === Display.TYPE"
          @hover="hoverOnType"
          @hoverLeave="hoveredTypes = []"
          @click="selectAndDeselectTypes"
          :selectedTypes="selectedTypes"
        />
        <AtomeqStateLegend
          v-if="elementDisplay === Display.STATE"
          @hover="(state) => (hoveredState = state.id)"
          @hoverLeave="hoveredState = undefined"
          @click="selectAndDeselectStates"
          :selectedStates="selectedStates"
        />
        <AtomeqBlockLegend
          v-if="elementDisplay === Display.BLOCK"
          @hover="(block) => (hoveredBlock = block)"
          @hoverLeave="hoveredState = undefined"
          @click="selectAndDeselectBlocks"
          :selectedBlocks="selectedBlocks"
        />
      </div>
    </div>
    <div :key="idx" v-for="(row, idx) in elementTable" class="grid grid-cols-18 gap-1">
      <div :key="`${element?.name}-${idx2}`" v-for="(element, idx2) in row" class="mb-1">
        <AtomeqElementComponent
          v-if="element"
          class="border-2 rounded h-20 shadow-md p-1 cursor-pointer"
          :class="displayColour(element)"
          :element="element"
          :faded="shouldFade(element) || shouldFadeOnState(element)"
          @click="selectedElement = element"
        />
      </div>
    </div>
    <div class="mt-4">
      <div :key="idx" v-for="(row, idx) in radioactiveGroupTable" class="grid grid-cols-18 gap-1">
        <div v-for="(element, idx2) in row" :key="element.id" :class="columnPosition(idx2)">
          <AtomeqElementComponent
            class="border-2 rounded h-20 shadow-md mb-1 p-1 cursor-pointer"
            :class="displayColour(element)"
            :element="element"
            :faded="shouldFade(element) || shouldFadeOnState(element)"
            @click="selectedElement = element"
          />
        </div>
      </div>
    </div>
  </div>
</template>
