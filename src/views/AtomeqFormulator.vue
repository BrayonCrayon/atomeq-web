<script setup lang="ts">
import FormulaEditor from '@/components/FormulaEditor.vue';
</script>

<template>
  <div class="w-5/6 flex flex-col mx-auto h-full pt-4 lg:pt-0 lg:w-3/4">
    <div class="flex grow justify-between">
      <div class="w-full h-3/4 flex flex-col shadow-2xl rounded border-2 lg:flex-row">
        <div class="py-2 px-4 lg:w-1/2">
          <h2 class="text-xl py-2">Enter your equation</h2>
          <div class="shadow-inner bg-gray-200 rounded-lg p-2 h-[55px]">
            <FormulaEditor />
          </div>
        </div>
        <div class="flex flex-col py-2 px-4 lg:w-1/2">
          <h2 class="text-xl py-2">Output</h2>
          <input
            type="text"
            placeholder="Result"
            disabled
            class="border border-gray-400 focus:border-blue-400 rounded w-full text-center text-2xl lg:w-5/6"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
