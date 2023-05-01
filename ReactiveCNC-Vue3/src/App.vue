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
  <TabView>
    <TabPanel header="PROGRAM">
      <GCodeTable 
        ref="gcodeTable"
        :disabled="false"
        style="width:700px;">
      </GCodeTable>
    </TabPanel>    
    <TabPanel header="MDI">
      <div style="width:700px;height:600px"></div>
    </TabPanel>    
  </TabView>
  <Button @click="scrollDown" label="ScrollTo(10)"></Button>
</template>

<style>
.wrapper,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app .p-tabview .p-tabview-panels {
  padding: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
