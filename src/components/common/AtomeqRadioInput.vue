<script setup lang="ts" generic="T">
import { ref, watch } from 'vue';

const props = defineProps<{
  initialValue: T;
  modelValue: T;
  label: string;
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
  <label class="link cursor-pointer" :aria-label="ariaLabel" @click="update">
    <span class="link-icon">
      <slot name="icon" />
    </span>
    <span class="link-title">{{ label }}</span>
    <input type="radio" hidden v-model="inputValue" :value="initialValue" />
  </label>
</template>

<style lang="scss" scoped>
.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 50px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transform-origin: center left;
  transition: width 0.2s ease-in;
  text-decoration: none;
  color: inherit;
  &:before {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    top: 0;
    transform: translateX(100%);
    transition: transform 0.2s ease-in;
    transform-origin: center right;
    background-color: #eee;
  }

  &:hover,
  &:focus {
    outline: 0;
    width: 130px;

    &:before,
    .link-title {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

.link-icon {
  width: 28px;
  height: 28px;
  display: block;
  flex-shrink: 0;
  left: 18px;
  position: absolute;
  svg {
    width: 28px;
    height: 28px;
  }
}

.link-title {
  transform: translateX(100%);
  transition: transform 0.2s ease-in;
  transform-origin: center right;
  display: block;
  text-align: center;
  text-indent: 28px;
  width: 100%;
}
</style>
