<script setup lang="ts"></script>

<template>
  <div class="w-3/4 flex flex-col mx-auto h-full">
    <div class="flex grow justify-between">
      <div class="w-1/2 h-3/4 py-2 border border-gray-600">
        <h2 class="text-xl p-2 mb-4">Enter your equation</h2>
        <input
          type="text"
          class="border border-gray-400 focus:border-blue-400 rounded w-5/6 ml-2"
        />
      </div>
      <div
        class="w-1/2 h-3/4 flex flex-col justify-center items-center py-2 border border-gray-400"
      >
        <h2 class="text-xl">Output</h2>
        <div>Some text in it</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
