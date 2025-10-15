<script setup lang="ts">
import AtomeqElementComponent from '@/components/AtomeqElement.vue';
import { AtomeqElement } from '@/types/element';
import useElements from '@/composables/useElements.ts';
import { computed, onMounted, ref } from 'vue';
import { getElementTable, getRadioactiveElementTable } from '@/helpers/tableUtils.ts';
import { Display } from '@/types/atomeq-table.ts';
import SwitchDisplay from '@/components/SwitchDisplay.vue';

const elementDisplay = ref<Display>(Display.TYPE);

const { getElements, elements } = useElements();

const elementTable = computed(() => {
  return getElementTable(elements.value);
});

const radioactiveGroup = computed(() => elements.value.filter((element) => element.group === 0));

const radioactiveGroupTable = computed(() => {
  return getRadioactiveElementTable(radioactiveGroup.value);
});

const columnPosition = (idx: number) => {
  const elementPosition: Record<number, string> = {
    0: 'col-start-4',
    1: 'col-start-5',
    2: 'col-start-6',
    3: 'col-start-7',
    4: 'col-start-8',
    5: 'col-start-9',
    6: 'col-start-10',
    7: 'col-start-11',
    8: 'col-start-12',
    9: 'col-start-13',
    10: 'col-start-14',
    11: 'col-start-15',
    12: 'col-start-16',
    13: 'col-start-17',
    14: 'col-start-18',
  };

  return elementPosition[idx];
};

const displayColour = (element: AtomeqElement) => {
  return {
    [`${element.typeColour}`]: elementDisplay.value === Display.TYPE,
    [`${element.stateColour}`]: elementDisplay.value === Display.STATE,
  };
};

onMounted(async () => {
  await getElements();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl">Periodic Table:</h1>
    <div class="flex gap-2">
      <form>
        <input id="a" type="radio" name="hopping" value="a" checked />
        <label for="a"><span></span>A</label>
        <input id="b" type="radio" name="hopping" value="b" />
        <label for="b"><span></span>B</label>
        <input id="c" type="radio" name="hopping" value="c" />
        <label for="c"><span></span>C</label>
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
      </form>
      <SwitchDisplay v-model="elementDisplay" />
    </div>
    <div :key="idx" v-for="(row, idx) in elementTable" class="grid grid-cols-18 gap-1">
      <div :key="`${element?.name}-${idx2}`" v-for="(element, idx2) in row" class="mb-1">
        <AtomeqElementComponent
          v-if="element"
          class="border-2 rounded h-20 shadow-md p-1"
          :class="displayColour(element)"
          :element="element"
        />
      </div>
    </div>
    <div class="mt-4">
      <div :key="idx" v-for="(row, idx) in radioactiveGroupTable" class="grid grid-cols-18 gap-1">
        <div v-for="(element, idx2) in row" :key="element.id" :class="columnPosition(idx2)">
          <AtomeqElementComponent
            class="border-2 rounded h-20 shadow-md mb-1 p-1"
            :class="displayColour(element)"
            :element="element"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
$wormDur: 0.4s
$radioDur: 0.2s
$timing1: cubic-bezier(0.45,0.05,0.55,0.95)
$timing2: cubic-bezier(0.5,0,0.5,2)
$radios: 3

//*
//  border: 0
//  box-sizing: border-box
//  margin: 0
//  padding: 0

//\:root
//  font-size: calc(32px + (40 - 32)*(100vw - 320px)/ (1024 - 320))

//body
//  background: #e3e4e8
//  color: #17181c
//  display: flex
//  font: 1em Hind, sans-serif
//  height: 100vh
//  line-height: 1.5
//  padding: 1.5em 0

form
  display: block
  margin: auto
  max-width: 10em
  position: relative

input
  position: fixed
  top: -1.5em
  left: -1.5em

label
  $shadowColor: rgba(0,0,0,0.2)
  cursor: pointer
  display: block
  font-weight: bold
  text-shadow: 0 0.1em 0.1em $shadowColor
  transition: color $radioDur $timing1
  &:not(:last-of-type)
    margin-bottom: 1.5em
  span
    box-shadow: 0 0 0 0.2em currentColor inset, 0 0.2em 0.2em $shadowColor, 0 0.3em 0.2em $shadowColor inset
    display: inline-block
    margin-right: 0.5em
    vertical-align: bottom
    width: 1.5em
    height: 1.5em
    transition: transform $radioDur $timing2, box-shadow $radioDur $timing1, color $radioDur $timing1

label span,
.worm__segment:before
  border-radius: 50%

input:checked + label,
input:checked + label span,
.worm__segment:before
  color: #255ff4

input:checked + label
  &, span
    transition-delay: $wormDur
  span
    transform: scale(1.2)

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
  $delay: $wormDur/100 * ($s - 1)
  .worm__segment:nth-child(#{$s})
    transition-delay: $delay
    &:before
      animation-delay: $delay

/* States */
@for $s from 1 through $radios
  input:nth-of-type(#{$s}):checked ~ .worm .worm__segment
    @if $s > 1
      transform: translateY(3em * ($s - 1))
    &:before
      animation-name: hop#{$s}

  @keyframes hop#{$s}
    from, to
      transform: translateX(0)
    50%
      transform: translateX(-1.5em)

/* Dark mode */
@media screen and (prefers-color-scheme: dark)
  body
    background: #17181c
    color: #e3e4e8

  input:checked + label,
  input:checked + label span,
  .worm__segment:before
    color: #5583f6
</style>
