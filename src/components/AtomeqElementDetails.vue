<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';
import AtomeqBadge from '@/components/common/AtomeqBadge.vue';
import { Variant } from '@/types/common.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div class="bg-gray-200 p-2 capitalize w-[620px] flex justify-between">
    <div class="">
      <div class="border-2 p-2 rounded-lg h-38 w-38 mb-2" :class="element.typeColour">
        <p class="font-semibold">{{ element.atomicNumber }}</p>
        <div class="text-5xl font-bold text-gray-900">
          {{ element.symbol }}
        </div>
        <div class="text-2xl text-gray-900 font-semibold">
          {{ element.name }}
        </div>
        <div class="text-gray-900 font-semibold">({{ element.atomicMass }})</div>
      </div>

      <div>
        <div class="flex gap-2 rounded-full py-0.5 items-center">
          <AtomeqBadge text="Metal" :variant="element.metal ? Variant.SUCCESS : Variant.DANGER" />
        </div>
        <div class="flex gap-2 rounded-full py-0.5 items-center">
          <AtomeqBadge
            text="Metalloid"
            :variant="element.metalloid ? Variant.SUCCESS : Variant.DANGER"
          />
        </div>
        <div class="flex gap-2 rounded-full py-0.5 items-center">
          <AtomeqBadge
            text="Naturally Occurring"
            :variant="element.natural ? Variant.SUCCESS : Variant.DANGER"
          />
        </div>
        <div class="flex gap-2 rounded-full py-0.5 items-center">
          <AtomeqBadge
            text="Radioactive"
            :variant="element.radioactive ? Variant.SUCCESS : Variant.DANGER"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 content-evenly gap-x-2 divide-y-1 divide-gray-400 text-gray-900">
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">atomicRadius:</p>
        {{ element.atomicRadius }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">group:</p>
        {{ element.group }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">period:</p>
        {{ element.period }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">electrons:</p>
        {{ element.electrons }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">isotopes:</p>
        {{ element.isotopes }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">neutrons:</p>
        {{ element.neutrons }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">protons:</p>
        {{ element.protons }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">boilingPoint:</p>
        <p>
          {{ element.boilingPoint }}
          <span class="pl-0.5">K</span>
        </p>
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">meltingPoint:</p>
        <p>
          {{ element.meltingPoint }}
          <span class="pl-0.5">K</span>
        </p>
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">density:</p>
        {{ element.density }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">electronegativity:</p>
        {{ element.electronegativity }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">firstIonization:</p>
        {{ element.firstIonization }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">shells:</p>
        {{ element.shells }}
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">specificHeat:</p>
        <p>
          {{ element.specificHeat }}
          <span class="pl-0.5">K</span>
        </p>
      </div>
      <div class="flex gap-1 justify-between">
        <p class="text-gray-500 font-semibold">valence:</p>
        {{ element.valence }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
