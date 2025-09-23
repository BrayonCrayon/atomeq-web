<script setup lang="ts">
import useElements from '@/composables/useElements.ts';
import { computed, onMounted } from 'vue';
import { getElementTable, getRadioactiveElementTable } from '@/helpers/tableUtils.ts';

const { getElements, elements } = useElements();

const elementTable = computed(() => {
  return getElementTable(elements.value);
});

const radioactiveGroup = computed(() => elements.value.filter((element) => element.group === 0));

const radioactiveGroupTable = computed(() => {
  console.log(radioactiveGroup.value);
  return getRadioactiveElementTable(radioactiveGroup.value);
});

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Periodic Table:</h1>
    <div :key="idx" v-for="(row, idx) in elementTable" class="grid grid-cols-18 gap-2">
      <div :key="idx2" v-for="(element, idx2) in row" class="border-2 rounded h-20 shadow-md">
        {{ element?.symbol ?? ' ' }}
      </div>
    </div>
    <div :key="idx" v-for="(row, idx) in radioactiveGroupTable" class="grid grid-cols-14 gap-2">
      <div :key="idx2" v-for="(element, idx2) in row" class="border-2 rounded h-20 shadow-md">
        {{ element?.symbol ?? ' ' }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
