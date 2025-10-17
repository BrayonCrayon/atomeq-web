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
  <div class="relative m-auto max-w-[10em] flex">
    <AtomeqRadioInput
      :initialValue="Display.TYPE"
      ariaLabel="type-display"
      name="display"
      label="Type"
      :checked="value === Display.TYPE"
      @update:modelValue="emit('update:modelValue', $event)"
    />
    <AtomeqRadioInput
      :initialValue="Display.STATE"
      ariaLabel="state-display"
      name="display"
      label="State"
      :checked="value === Display.STATE"
      @update:modelValue="emit('update:modelValue', $event)"
    />
    <AtomeqRadioInput
      :initialValue="Display.BLOCK"
      ariaLabel="block-display"
      name="display"
      label="Block"
      :checked="value === Display.BLOCK"
      @update:modelValue="emit('update:modelValue', $event)"
    />
    <div class="worm">
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
      <div class="worm__segment"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
$wormDur: 0.4s
$radioDur: 0.2s
$timing1: cubic-bezier(0.45,0.05,0.55,0.95)
$timing2: cubic-bezier(0.5,0,0.5,2)
$radios: 2

//input
//  position: fixed
//  top: -1.5em
//  left: -1.5em
//
//label
//  $shadowColor: rgba(0,0,0,0.2)
//  cursor: pointer
//  display: block
//  font-weight: bold
//  text-shadow: 0 0.1em 0.1em $shadowColor
//  transition: color $radioDur $timing1
//  &:not(:last-of-type)
//    margin-bottom: 1.5em
//  span
//    box-shadow: 0 0 0 0.2em currentColor inset, 0 0.2em 0.2em $shadowColor, 0 0.3em 0.2em $shadowColor inset
//    display: inline-block
//    margin-right: 0.5em
//    vertical-align: bottom
//    width: 1.5em
//    height: 1.5em
//    transition: transform $radioDur $timing2, box-shadow $radioDur $timing1, color $radioDur $timing1

//.worm-input
//  display: block
//  margin: auto
//  max-width: 10em
//  position: relative

//label span,
.worm__segment:before
  border-radius: 50%

//input:checked + label,
//input:checked + label span,
.worm__segment:before
  color: #255ff4

//input:checked + label
//  &, span
//    transition-delay: $wormDur
//  span
//    transform: scale(1.2)

.worm
  top: 0.375em
  left: 0.375em
  &, &__segment
    position: absolute
  &__segment
    top: 0
    left: 0
    width: 0.75em
    height: 0.75em
    transition: transform $wormDur $timing1
    &:before
      animation-duration: $wormDur
      animation-timing-function: $timing1
      background: currentColor
      content: ""
      display: block
      width: 100%
      height: 100%
    &:first-child, &:last-child
      &:before
        box-shadow: 0 0 1em 0 currentColor

@for $s from 2 through 30
  $delay: calc($wormDur/100) * ($s - 1)
  .worm__segment:nth-child(#{$s})
    transition-delay: $delay
    &:before
      animation-delay: $delay

/* States */
@for $s from 1 through $radios
  input:nth-of-type(#{$s}):checked ~ .worm .worm__segment
    @if $s > 1
      transform: translateX(3em * ($s - 1))
    &:before
      animation-name: hop#{$s}

  @keyframes hop#{$s}
    from, to
      transform: translateY(0)
    50%
      transform: translateY(-1.5em)

/* Dark mode */
//@media screen and (prefers-color-scheme: dark)
//  body
//    background: #17181c
//    color: #e3e4e8
//
//  input:checked + label,
//  input:checked + label span,
//  .worm__segment:before
//    color: #5583f6
</style>
