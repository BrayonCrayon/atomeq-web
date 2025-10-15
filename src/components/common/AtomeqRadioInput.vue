<script setup lang="ts" generic="T">
import { ref } from 'vue';

const props = defineProps<{
  initialValue: T;
  label: string;
  name: string;
  ariaLabel: string;
}>();

const internalValue = ref<T>(props.initialValue);

const emit = defineEmits<{
  'update:modelValue': [value: T];
}>();

const update = (event: Event) => {
  const value = (event.target as HTMLInputElement).value as T;

  emit('update:modelValue', value);
};
</script>

<template>
  <label class="cursor-pointer">
    {{ label }}
    <input
      v-model="internalValue"
      class="cursor-pointer"
      type="radio"
      :value="initialValue"
      :name="props.name"
      :aria-label="ariaLabel"
      @input="update"
    />
  </label>
</template>
