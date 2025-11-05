<script setup lang="ts">
import type { AtomeqElement } from '@/types/element.ts';

defineProps<{
  element: AtomeqElement;
}>();
</script>

<template>
  <div>{{ element.name }}</div>
  <div>{{ element.symbol }}</div>
  <div>{{ element.atomicNumber }}</div>
  <div>{{ element.atomicMass }}</div>
  <div>{{ element.atomicRadius }}</div>
  <div>{{ element.boilingPoint }}</div>
  <div>{{ element.density }}</div>
  <div>{{ element.electronegativity }}</div>
  <div>{{ element.electrons }}</div>
  <div>{{ element.firstIonization }}</div>
  <div>{{ element.group }}</div>
  <div>{{ element.isotopes }}</div>
  <div>{{ element.meltingPoint }}</div>
  <div>{{ element.metal }}</div>
  <div>{{ element.metalloid }}</div>
  <div>{{ element.natural }}</div>
  <div>{{ element.neutrons }}</div>
  <div>{{ element.period }}</div>
  <div>{{ element.protons }}</div>
  <div>{{ element.radioactive }}</div>
  <div>{{ element.shells }}</div>
  <div>{{ element.specificHeat }}</div>
  <div>{{ element.valence }}</div>
</template>

<style scoped></style>
