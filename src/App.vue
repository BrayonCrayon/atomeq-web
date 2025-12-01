<script setup lang="ts">
import { RouterView } from 'vue-router';
import AtomeqLayout from '@/layouts/AtomeqLayout.vue';
import AtomeqNav from '@/components/AtomeqNav.vue';
</script>

<template>
  <AtomeqLayout>
    <template #nav>
      <div class="h-1/12">
        <AtomeqNav :isAuthed="true" />
      </div>
    </template>
    <template #content>
      <div class="h-11/12">
        <RouterView />
      </div>
    </template>
    <template #footer></template>
  </AtomeqLayout>
</template>

<style scoped></style>
