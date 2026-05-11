<script setup lang="ts">
import { ref } from 'vue';
import EditorJS from '@editorjs/editorjs';
import { Subscript } from '@/editorjs-plugins/Subscript.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const editor = ref(
  new EditorJS({
    holder: 'editor',
    tools: {
      subscript: Subscript,
    },
  }),
);
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped></style>
