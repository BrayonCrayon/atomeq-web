<script setup lang="ts">
import { Atom } from 'lucide-vue-next';
import { ref } from 'vue';
import AtomeqDropdown from '@/components/AtomeqDropdown.vue';

defineProps<{
  isAuthed: boolean;
}>();

const show = ref<boolean>(false);
const showMenu = () => {
  show.value = !show.value;
};
</script>

<template>
  <div class="w-full flex px-4 py-2 justify-between shadow-lg border-b-2 border-gray-200">
    <RouterLink :to="{ name: 'home' }" class="text-4xl font-bold sm:w-1/8">Atomeq</RouterLink>
    <button @click="showMenu" data-testid="atom-menu" class="sm:hidden">
      <Atom :size="42" />
    </button>
    <div class="hidden sm:flex sm:items-center sm:gap-x-4 sm:flex-grow sm:justify-end">
      <p v-if="!isAuthed" class="font-semibold cursor-pointer">
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
      </p>
      <p v-if="!isAuthed" class="font-semibold cursor-pointer">
        <RouterLink :to="{ name: 'register' }">Register</RouterLink>
      </p>
      <div v-if="isAuthed" class="flex gap-x-4 flex-grow justify-center">
        <RouterLink :to="{ name: 'table' }" class="font-semibold cursor-pointer">Table</RouterLink>
        <RouterLink :to="{ name: 'formulator' }" class="font-semibold cursor-pointer">
          Formulator 9000
        </RouterLink>
      </div>
      <AtomeqDropdown v-if="isAuthed" button-title="Username">
        <RouterLink
          class="font-semibold cursor-pointer p-2 bg-inherit text-nowrap hover:brightness-75"
          :to="{ name: 'user-profile' }"
        >
          User Profile
        </RouterLink>
        <li class="font-semibold cursor-pointer p-2 bg-inherit text-nowrap hover:brightness-75">
          Logout
        </li>
      </AtomeqDropdown>
    </div>
  </div>
  <div
    class="w-full border-t border-gray-200 bg-white p-4 shadow-md sm:hidden"
    v-if="show"
    data-testid="mobile-dropdown"
  >
    <p v-if="!isAuthed" class="font-semibold mb-2">
      <RouterLink :to="{ name: 'login' }">Login</RouterLink>
    </p>
    <p v-if="!isAuthed" class="font-semibold">
      <RouterLink :to="{ name: 'register' }">Register</RouterLink>
    </p>
    <p v-if="isAuthed" class="font-semibold mb-2">
      <RouterLink :to="{ name: 'user-profile' }">User Profile</RouterLink>
    </p>
    <p v-if="isAuthed" class="font-semibold mb-2">
      <RouterLink :to="{ name: 'table' }">Table</RouterLink>
    </p>
    <p v-if="isAuthed" class="font-semibold mb-2">
      <RouterLink :to="{ name: 'formulator' }">Formulator 9000</RouterLink>
    </p>
    <p v-if="isAuthed" class="font-semibold">Logout</p>
  </div>
</template>

<style scoped></style>
