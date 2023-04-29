<script setup lang="ts">
import { loadGCodeFromURL } from "./GCode.ts";
import GCodeTable from './components/GCodeTable.vue';
import { ref, onMounted } from 'vue';

const gcodeTable = ref();

onMounted(() => {
  loadGCodeFromURL("/src/assets/gcode.txt");
})

const scrollDown = (() => {
  gcodeTable.value.scrollToRow(10);
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
