<script setup lang="ts" generic="T">
import { ref, watch } from 'vue';

const props = defineProps<{
  initialValue: T;
  modelValue: T;
  label: string;
  name: string;
  ariaLabel: string;
}>();

const inputValue = ref<T>(props.modelValue);

const emit = defineEmits<{
  'update:modelValue': [value: T];
}>();

const update = () => {
  emit('update:modelValue', props.initialValue);
};

watch(
  () => props.modelValue,
  (newValue: T) => {
    inputValue.value = newValue;
  },
);
</script>

<template>
  <label :aria-label="ariaLabel" class="cursor-pointer flex" @click="update">
    <input
      class="cursor-pointer mr-1.5"
      type="radio"
      v-model="inputValue"
      :value="initialValue"
      :name="props.name"
      @update:modelValue="emit('update:modelValue', props.initialValue)"
    />
    {{ label }}
  </label>
</template>
