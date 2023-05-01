<script setup lang="ts">
import { loadGCodeFromURL, gcodeLinesRef } from "./GCode.ts";
import GCodeTable from './components/GCodeTable.vue';
import { ref, onMounted } from 'vue';

const gcodeTable = ref();
var line = 0;

onMounted(() => {
  loadGCodeFromURL("/src/assets/gcode.txt");

  setInterval(() => {
//    gcodeTable.value.selectRow(line);
//    line++;
//    if (line > gcodeLinesRef.value.length) line = 0;
  },16.666);
})

const scrollDown = (() => {
  gcodeTable.value.selectRow(line++);
  if (line > gcodeLinesRef.value.length) line = 0;
})

</script>

<template>
  <GCodeTable 
    ref="gcodeTable"
    :disabled="false"
    style="width:700px;">
  </GCodeTable>
  <Button @click="scrollDown" label="ScrollTo(10)"></Button>
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
