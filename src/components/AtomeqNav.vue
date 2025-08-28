<script setup lang="ts">
import { Atom } from 'lucide-vue-next'
import { ref } from 'vue'
import AtomeqDropdown from '@/components/AtomeqDropdown.vue'

defineProps<{
  isAuthed: boolean
}>()

const show = ref<boolean>(false)
const showMenu = () => {
  show.value = !show.value
}
</script>

<template>
  <div>
    <div class="w-full flex px-4 py-2 justify-between shadow-md">
      <p class="text-4xl font-bold  sm:w-1/8">Atomeq</p>
      <button @click="showMenu" data-testid="atom-menu" class="sm:hidden">
        <Atom :size="42" />
      </button>
      <div class="hidden sm:flex sm:items-center sm:gap-x-4 sm:flex-grow sm:justify-end">
        <p v-if="!isAuthed" class="font-semibold cursor-pointer">Login</p>
        <p v-if="!isAuthed" class="font-semibold cursor-pointer">Register</p>
        <div v-if="isAuthed" class="flex gap-x-4 flex-grow justify-center">
          <p class="font-semibold cursor-pointer">Table</p>
          <p class="font-semibold cursor-pointer">Formulator 9000</p>
        </div>
        <AtomeqDropdown v-if="isAuthed" button-title="Username" :options="['User Profile', 'Logout']"/>
      </div>
    </div>
    <div class="w-full border-t border-gray-200 bg-white p-4 shadow-md sm:hidden" v-if="show" data-testid="mobile-dropdown">
      <p v-if="!isAuthed" class="font-semibold mb-2">Login</p>
      <p v-if="!isAuthed" class="font-semibold">Register</p>
      <p v-if="isAuthed" class="font-semibold mb-2">User Profile</p>
      <p v-if="isAuthed" class="font-semibold mb-2">Table</p>
      <p v-if="isAuthed" class="font-semibold mb-2">Formulator 9000</p>
      <p v-if="isAuthed" class="font-semibold">Logout</p>
    </div>
  </div>
</template>

<style scoped></style>
