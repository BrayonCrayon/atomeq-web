<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';
import AtomeqElementDetails from '@/components/AtomeqElementDetails.vue';

withDefaults(
  defineProps<{
    show?: boolean;
    modalClass?: string;
    element: AtomeqElement;
  }>(),
  {
    show: false,
    modalClass: '',
  },
);

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="bg-white fixed z-100 left-[50%] top-[20%] w-[700px] -ml-[350px] border-2 border-gray-900"
      :class="modalClass"
    >
      <AtomeqElementDetails :element="element" />
      <button @click="emit('close')">Close</button>
    </div>
  </Teleport>
</template>

<style scoped></style>
