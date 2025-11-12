<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';
import AtomeqBadge from '@/components/common/AtomeqBadge.vue';
import { Variant } from '@/types/common.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div class="bg-gray-200 rounded-lg p-2 capitalize w-[620px] flex justify-between">
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

    <div class="grid grid-cols-2">
      <div>atomicRadius: {{ element.atomicRadius }}</div>
      <div>group: {{ element.group }}</div>
      <div>period: {{ element.period }}</div>
      <div>electrons: {{ element.electrons }}</div>
      <div>isotopes: {{ element.isotopes }}</div>
      <div>neutrons: {{ element.neutrons }}</div>
      <div>protons: {{ element.protons }}</div>
      <div>boilingPoint: {{ element.boilingPoint }}</div>
      <div>meltingPoint: {{ element.meltingPoint }}</div>
      <div>density: {{ element.density }}</div>
      <div>electronegativity: {{ element.electronegativity }}</div>
      <div>firstIonization: {{ element.firstIonization }}</div>
      <div>shells: {{ element.shells }}</div>
      <div>specificHeat: {{ element.specificHeat }}</div>
      <div>valence: {{ element.valence }}</div>
    </div>
  </div>
</template>

<style scoped></style>
