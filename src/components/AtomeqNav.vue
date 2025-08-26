<script setup lang="ts">
import { Atom } from 'lucide-vue-next'
import { ref } from 'vue'

const show = ref<boolean>(false)
const showMenu = () => {
  show.value = !show.value
}
</script>

<template>
  <div>
    <div class="w-full flex px-2 py-2 justify-between shadow-md">
      <p class="text-4xl font-bold">Atomeq</p>
      <button @click="showMenu" data-testid="atom-menu">
        <Atom :size="42" />
      </button>
    </div>
    <div class="w-full border-t border-gray-200 bg-white p-4 shadow-md" v-if="show" data-testid="mobile-dropdown">
      <p class="font-semibold mb-2">Login</p>
      <p class="font-semibold">Register</p>
    </div>
  </div>
</template>

<style scoped></style>
