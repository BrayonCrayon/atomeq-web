<script setup lang="ts">
import { ref } from 'vue';
import EditorJS from '@editorjs/editorjs';
import { Subscript } from '@/editorjs-plugins/Subscript.ts';
import { SimpleImage } from '@/editorjs-plugins/SimpleImage.ts';

const editor = ref(
  new EditorJS({
    holder: 'editor',
    tools: {
      subscript: { class: Subscript, inlineToolbar: true },
    },
  }),
);
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped></style>
