<script setup lang="ts">
import { onMounted } from 'vue';
import { useTypes } from '@/composables/useTypes.ts';

const { getTypes, getFormattedTypes } = useTypes();

onMounted(async () => {
  await getTypes();
});
</script>

<!--TODO:
  0. how do I want to handle the design? alignment
  2. turn those into buttons that on hover colour the correct section
-->

<template>
  <div v-for="[parent, children] in getFormattedTypes()" :key="parent.id">
    <div class="bg-amber-500 border-2 p-2 text-sm text-center capitalize">
      {{ parent.name }}
    </div>
    <div
      v-for="child in children"
      :key="child.id"
      class="bg-amber-700 border-2 p-2 text-xs text-center capitalize"
    >
      {{ child.name }}
    </div>
  </div>
</template>

<style scoped></style>
