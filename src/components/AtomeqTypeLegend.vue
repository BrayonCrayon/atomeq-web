<script setup lang="ts">
import { onMounted } from 'vue';
import { useTypes } from '@/composables/useTypes.ts';

const { getTypes, getFormattedTypes } = useTypes();

onMounted(async () => {
  await getTypes();
});
</script>

<template>
  <div v-for="[parent, children] in getFormattedTypes()" :key="parent.id">
    <div class="bg-amber-500">
      {{ parent.name }}
    </div>
    <div v-for="child in children" :key="child.id" class="bg-amber-700">
      {{ child.name }}
    </div>
  </div>
</template>

<style scoped></style>
