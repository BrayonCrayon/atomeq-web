<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  buttonTitle: string,
  options?: string[]
}>();

const show = ref<boolean>(false)

const toggleShow = () => {
  show.value = !show.value
}
</script>

<template>
  <div>
    <button class="font-semibold cursor-pointer" @click="toggleShow">{{buttonTitle}}</button>
    <div class="flex relative">
      <Transition name="slide-fade">
        <ul class="absolute py-4 rounded-lg bg-gray-300 shadow-lg right-0" v-if="show">
          <slot>
            <li class="font-semibold cursor-pointer p-2 bg-inherit text-nowrap hover:brightness-75" v-for="option in options" :key="option">{{option}}</li>
          </slot>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
