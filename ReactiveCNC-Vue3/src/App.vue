<script setup lang="ts">
import gcode from "./GCode.ts";
import GCodeTable from './components/GCodeTable.vue';
import { ref, onMounted } from 'vue';
const gcoderef = ref();
onMounted(() => {
  gcode.loadFromURL("/src/assets/gcode.txt").then(()=> {
    gcoderef.value = gcode; 
  })
})
</script>

<template>
  <GCodeTable 
    :gcode=gcoderef
    style="width:600px;">
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
