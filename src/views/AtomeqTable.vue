<script setup lang="ts">
import axios from 'axios';

const url = "http://localhost/elements";

axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

console.log(data.value);
</script>

<template>
<div>Periodic Table</div>
</template>

<style scoped>

</style>
