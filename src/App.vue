<script setup lang="ts">
import { RouterView } from 'vue-router';
import AtomeqLayout from '@/layouts/AtomeqLayout.vue';
import AtomeqNav from '@/components/AtomeqNav.vue';
</script>

<template>
  <AtomeqLayout>
    <template #nav>
      <div>
        <AtomeqNav :isAuthed="true" />
      </div>
    </template>
    <template #content>
      <div class="grow bg-slate-50">
        <RouterView />
      </div>
    </template>
    <template #footer></template>
  </AtomeqLayout>
</template>

<style scoped></style>
