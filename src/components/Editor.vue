<script setup lang="ts">
import { ref } from 'vue';
import EditorJS from '@editorjs/editorjs';

const editor = ref(
  new EditorJS({
    holder: 'editor',
  }),
);
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped></style>
