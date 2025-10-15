<script setup lang="ts">
import { withDefaults } from 'vue';
import { Display } from '@/types/atomeq-table.ts';
import AtomeqRadioInput from '@/components/common/AtomeqRadioInput.vue';

withDefaults(
  defineProps<{
    value?: Display;
  }>(),
  {
    value: Display.TYPE,
  },
);

const emit = defineEmits<{
  'update:modelValue': [display: Display];
}>();
</script>

<template>
  <div>
    <AtomeqRadioInput
      :initialValue="Display.STATE"
      ariaLabel="state-display"
      name="display"
      label="State"
      @update:modelValue="emit('update:modelValue', $event)"
    />
  </div>
  <div>
    <AtomeqRadioInput
      :initialValue="Display.TYPE"
      ariaLabel="type-display"
      name="display"
      label="Type"
      @update:modelValue="emit('update:modelValue', $event)"
    />
  </div>
</template>
