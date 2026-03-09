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
  <div class="menu">
    <label class="link cursor-pointer">
      <span class="link-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="192"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <path
            d="M213.3815,109.61945,133.376,36.88436a8,8,0,0,0-10.76339.00036l-79.9945,72.73477A8,8,0,0,0,40,115.53855V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.53887A8,8,0,0,0,213.3815,109.61945Z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></path>
        </svg>
      </span>
      <span class="link-title">Type</span>
      <input type="radio" hidden />
    </label>
    <label class="link cursor-pointer">
      <span class="link-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="192"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <polyline
            points="76.201 132.201 152.201 40.201 216 40 215.799 103.799 123.799 179.799"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></polyline>
          <line
            x1="100"
            y1="156"
            x2="160"
            y2="96"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></line>
          <path
            d="M82.14214,197.45584,52.201,227.397a8,8,0,0,1-11.31371,0L28.603,215.11268a8,8,0,0,1,0-11.31371l29.94113-29.94112a8,8,0,0,0,0-11.31371L37.65685,141.65685a8,8,0,0,1,0-11.3137l12.6863-12.6863a8,8,0,0,1,11.3137,0l76.6863,76.6863a8,8,0,0,1,0,11.3137l-12.6863,12.6863a8,8,0,0,1-11.3137,0L93.45584,197.45584A8,8,0,0,0,82.14214,197.45584Z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></path>
        </svg>
      </span>
      <span class="link-title">State</span>
      <input type="radio" hidden />
    </label>
  </div>

  <div class="relative m-auto flex gap-x-6">
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

<style lang="scss" scoped>
/* From Uiverse.io by Admin12121 */
.menu {
  padding: 0.5rem;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 10px 25px 0 rgba(#000, 0.075);
}

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
