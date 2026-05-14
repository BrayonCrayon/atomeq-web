<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EditorJS from '@editorjs/editorjs';
import { Subscript } from '@/editorjs-plugins/Subscript.ts';

const editor = ref(
  new EditorJS({
    holder: 'editor',
    placeholder: 'Type your chemical formula here...',
    tools: {
      subscript: Subscript,
    },
    onReady: () => {
      const holder = document.getElementById('editor');
      holder?.addEventListener('keydown', preventBlocks, true);
    },
    onChange: async (api) => {
      const count = api.blocks.getBlocksCount();
      if (count > 1) {
        for (let i = count - 1; i > 0; i--) {
          api.blocks.delete(i);
        }
      }
    },
  }),
);
const latestEntry = ref('');

const calculate = async () => {
  const result = await editor.value.save();

  latestEntry.value = result.blocks[0].data.text;
};

const preventBlocks = (event: KeyboardEvent) => {
  if (event.key !== 'Enter') {
    return;
  }

  event.stopImmediatePropagation();
  event.preventDefault();
};

onMounted(async () => {
  await editor.value.isReady;
});
</script>

<template>
  <div id="editor"></div>
  <button @click="calculate">Calculate</button>
  <p>{{ latestEntry }}</p>
</template>

<style scoped>
/* Hide the plus button to prevent adding new blocks */
:deep(.ce-toolbar__plus) {
  display: none;
}

/* Hide the settings (tunes) button as we only have one block */
:deep(.ce-toolbar__settings-btn) {
  display: none;
}
</style>
