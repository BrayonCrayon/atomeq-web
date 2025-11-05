<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';
import AtomeqBadge from '@/components/common/AtomeqBadge.vue';
import { Variant } from '@/types/common.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div class="grid grid-cols-4 bg-gray-200 rounded-lg p-2 capitalize">
    <div>{{ element.name }}</div>
    <div>symbol: {{ element.symbol }}</div>
    <div>atomicNumber: {{ element.atomicNumber }}</div>
    <div>atomicMass: {{ element.atomicMass }}</div>
    <div>atomicRadius: {{ element.atomicRadius }}</div>
    <div>boilingPoint: {{ element.boilingPoint }}</div>
    <div>density: {{ element.density }}</div>
    <div>electronegativity: {{ element.electronegativity }}</div>
    <div>electrons: {{ element.electrons }}</div>
    <div>firstIonization: {{ element.firstIonization }}</div>
    <div>group: {{ element.group }}</div>
    <div>isotopes: {{ element.isotopes }}</div>
    <div>meltingPoint: {{ element.meltingPoint }}</div>
    <div>metal: {{ element.metal }}</div>
    <div>metalloid: {{ element.metalloid }}</div>

    <div class="flex gap-2 rounded-full px-4 py-0.5 items-center">
      <AtomeqBadge
        text="Naturally Occurring"
        :variant="element.natural ? Variant.SUCCESS : Variant.DANGER"
      />
    </div>

    <div>neutrons: {{ element.neutrons }}</div>
    <div>period: {{ element.period }}</div>
    <div>protons: {{ element.protons }}</div>
    <div>radioactive: {{ element.radioactive }}</div>
    <div>shells: {{ element.shells }}</div>
    <div>specificHeat: {{ element.specificHeat }}</div>
    <div>valence: {{ element.valence }}</div>
  </div>
</template>

<style scoped></style>
