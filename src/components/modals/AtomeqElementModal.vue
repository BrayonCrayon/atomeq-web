<script setup lang="ts">
withDefaults(
  defineProps<{
    show?: boolean;
    modalClass?: string;
  }>(),
  {
    show: false,
    modalClass: '',
  },
);

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="bg-black text-white fixed z-100 left-[50%] top-[20%] w-[600px] -ml-[300px]"
      :class="modalClass"
    >
      <p>Hello from the modal!</p>
      <button @click="emit('close')">Close</button>
    </div>
  </Teleport>
</template>

<style scoped></style>
