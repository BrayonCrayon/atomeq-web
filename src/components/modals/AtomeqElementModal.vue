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
      class="z-100 backdrop-blur-sm top-0 h-full w-full fixed flex items-center justify-center cursor-pointer"
      :class="modalClass"
      @click="emit('close')"
    >
      <div
        class="z-101 shrink inline-block m-auto h-fit w-fit rounded-lg p-2 bg-gray-200 border-2 border-gray-500 cursor-default"
        @click.stop
      >
        <AtomeqElementDetails :element="element" />
      </div>
    </div>
  </Teleport>
</template>
