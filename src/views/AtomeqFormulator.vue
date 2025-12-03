<script setup lang="ts"></script>

<template>
  <div class="w-3/4 flex flex-col mx-auto h-full">
    <div class="flex grow justify-between">
      <div class="w-full h-3/4 flex shadow-2xl rounded border-2">
        <div class="w-1/2 py-2">
          <h2 class="text-xl p-2">Enter your equation</h2>
          <input
            type="text"
            class="border border-gray-400 focus:border-blue-400 rounded w-5/6 ml-2 px-2"
          />
        </div>
        <div class="w-1/2 flex flex-col py-2">
          <h2 class="text-xl p-2">Output</h2>
          <input
            type="text"
            placeholder="Result"
            disabled
            class="border border-gray-400 focus:border-blue-400 rounded w-5/6 ml-2 text-center"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
