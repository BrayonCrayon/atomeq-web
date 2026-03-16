<script setup lang="ts">
import { withDefaults } from 'vue';
import { Display } from '@/types/atomeq-table.ts';
import AtomeqRadioInput from '@/components/common/AtomeqRadioInput.vue';
import { Ban } from 'lucide-vue-next';

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
  <div class="menu">
    <AtomeqRadioInput
      :modelValue="modelValue"
      :initialValue="Display.TYPE"
      ariaLabel="type-display"
      label="Type"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <template #icon>
        <img src="@/assets/images/type.png" alt="Type Icon" />
      </template>
    </AtomeqRadioInput>
    <AtomeqRadioInput
      :modelValue="modelValue"
      :initialValue="Display.STATE"
      ariaLabel="state-display"
      label="State"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <template #icon>
        <img src="@/assets/images/state.png" alt="State Icon" />
      </template>
    </AtomeqRadioInput>
    <AtomeqRadioInput
      :modelValue="modelValue"
      :initialValue="Display.BLOCK"
      ariaLabel="block-display"
      label="Block"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <template #icon>
        <img src="@/assets/images/block.png" alt="Block Icon" />
      </template>
    </AtomeqRadioInput>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding: 0.5rem;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 10px 25px 0 rgba(#000, 0.075);
}
</style>
