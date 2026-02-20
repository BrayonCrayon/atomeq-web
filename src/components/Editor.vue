<script setup lang="ts">
import { ref } from 'vue';
import EditorJS from '@editorjs/editorjs';
import { Subscript } from '@/editorjs-plugins/Subscript.ts';

const editor = ref(
  new EditorJS({
    holder: 'editor',
    tools: {
      // TODO: Something ain't right here. Fix it!
      subscript: { class: Subscript, inlineToolbar: true },
    },
  }),
);
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped></style>
