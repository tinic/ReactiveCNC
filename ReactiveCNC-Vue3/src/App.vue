<script setup lang="ts">
import { gcoderef } from "./GCode.ts";
import GCodeTable from './components/GCodeTable.vue';
import { onMounted } from 'vue';

onMounted(() => {
  gcoderef.value.loadFromURL("/src/assets/gcode.txt").then(()=> {
  })
})
</script>

<template>
  <GCodeTable 
    style="width:700px;">
  </GCodeTable>
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
