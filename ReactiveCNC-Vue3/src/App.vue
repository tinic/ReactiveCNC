<script setup lang="ts">
import GCodeTable from './components/GCodeTable.vue';
</script>

<template>
  <GCodeTable style="width:600px;"></GCodeTable>
  This is just a test.
</template>

<style scoped>
.wrapper,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
