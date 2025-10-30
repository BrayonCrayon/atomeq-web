<script setup lang="ts">
import { withDefaults } from 'vue';
import { Display } from '@/types/atomeq-table.ts';
import AtomeqRadioInput from '@/components/common/AtomeqRadioInput.vue';

withDefaults(
  defineProps<{
    modelValue: Display;
  }>(),
  {
    modelValue: Display.TYPE,
  },
);

const emit = defineEmits<{
  'update:modelValue': [display: Display];
}>();
</script>

<template>
  <div class="relative m-auto max-w-[10em] flex gap-x-6">
    <AtomeqRadioInput
      :modelValue="modelValue"
      :initialValue="Display.TYPE"
      ariaLabel="type-display"
      name="display"
      label="Type"
      @update:modelValue="emit('update:modelValue', $event)"
    />
    <AtomeqRadioInput
      :modelValue="modelValue"
      :initialValue="Display.STATE"
      ariaLabel="state-display"
      name="display"
      label="State"
      @update:modelValue="emit('update:modelValue', $event)"
    />
    <AtomeqRadioInput
      :modelValue="modelValue"
      :initialValue="Display.BLOCK"
      ariaLabel="block-display"
      name="display"
      label="Block"
      @update:modelValue="emit('update:modelValue', $event)"
    />
  </div>
</template>
