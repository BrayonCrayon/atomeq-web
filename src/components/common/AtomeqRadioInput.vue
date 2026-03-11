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
      <!--      <slot name="svg" />-->
      <!--      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org">-->
      <!--        &lt;!&ndash; Solid (Bottom Left): Heavy, fully filled &ndash;&gt;-->
      <!--        <circle cx="7" cy="17" r="4" fill="currentColor" />-->

      <!--        &lt;!&ndash; Liquid (Top Center): Concentric 'ripple' effect &ndash;&gt;-->
      <!--        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" />-->
      <!--        <circle cx="12" cy="7" r="1.5" fill="currentColor" />-->

      <!--        &lt;!&ndash; Gas (Bottom Right): Bold 'Cloud' or Dotted ring &ndash;&gt;-->
      <!--        &lt;!&ndash; We use a thick stroke with a clear dash-gap for visibility &ndash;&gt;-->
      <!--        <circle-->
      <!--          cx="17"-->
      <!--          cy="17"-->
      <!--          r="4"-->
      <!--          stroke="currentColor"-->
      <!--          stroke-width="2.5"-->
      <!--          stroke-dasharray="2.5 2"-->
      <!--        />-->
      <!--      </svg>-->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org">
        <!-- The Main Circle Container -->
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />

        <!-- Diagonal Divider -->
        <line
          x1="19"
          y1="5"
          x2="5"
          y2="19"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />

        <!-- Left/Bottom Side: The "Metal Ingot" (Solid) -->
        <path d="M7 13.5L10.5 17H6L4.5 15.5L7 13.5Z" fill="currentColor" />
        <path d="M8 12L12 16H8.5L7 14.5L8 12Z" fill="currentColor" opacity="0.6" />

        <!-- Right/Top Side: The "Smoke" (Vapor) -->
        <path
          d="M14 10C14 10 15 7 17 8C19 9 17 11 15 11"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M12 8C12 8 13 5 15 6C17 7 15 9 13 9"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          opacity="0.7"
        />
      </svg>
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
