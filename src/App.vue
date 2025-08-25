<script setup lang="ts">
import { RouterView } from 'vue-router'
import AtomeqLayout from '@/layouts/AtomeqLayout.vue'
import AtomeqNav from '@/components/AtomeqNav.vue'
</script>

<!--TODO: USE THIS https://lucide.dev/guide/packages/lucide-vue-next-->

<template>
  <AtomeqLayout>
    <template #nav>
      <AtomeqNav />
    </template>
    <template #content>
      <RouterView />
    </template>
    <template #footer></template>
  </AtomeqLayout>
</template>

<style scoped></style>
