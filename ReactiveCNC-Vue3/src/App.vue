<script setup lang="ts">
import { loadGCodeFromURL } from "./GCode.ts";
import GCodeTable from './components/GCodeTable.vue';
import MDITable from './components/MDITable.vue'
import JogPanel from './components/JogPanel.vue'
import { ref, onMounted } from 'vue';

const gcodeTable = ref();
//var line = 0;

onMounted(() => {
  loadGCodeFromURL("/src/assets/gcode.txt");

  setInterval(() => {
//    gcodeTable.value.selectRow(line);
//    line++;
//    if (line > gcodeLinesRef.value.length) line = 0;
  },16.666);
})

//const scrollDown = (() => {
//  gcodeTable.value.selectRow(line++);
//  if (line > gcodeLinesRef.value.length) line = 0;
//})

</script>

<template>
  <TabView>
    <TabPanel>
      <template #header>
        <i class="pi pi-cog m-0 p-0 pr-2" style="font-size: 1.5rem"/>
        <span>PROGRAM</span>
      </template>
      <GCodeTable 
        ref="gcodeTable"
        :disabled="false"
        style="width:600px;height:25em;">
      </GCodeTable>
    </TabPanel>    
    <TabPanel>
      <template #header>
        <i class="pi pi-calculator m-0 p-0 pr-2" style="font-size: 1.5rem"/>
        <span>MDI</span>
      </template>
      <div style="width:600px;height:25em;">
        <MDITable>
        </MDITable>
      </div>
    </TabPanel>    
    <TabPanel>
      <template #header>
        <i class="pi pi-arrows-alt m-0 p-0 pr-2" style="font-size: 1.5rem"/>
        <span>JOG</span>
      </template>
      <div style="width:600px;height:25em;">
        <JogPanel>
        </JogPanel>
      </div>
    </TabPanel>    
  </TabView>
</template>

<style>
.wrapper,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app .p-tabview-header {
  font-weight: regular;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
}

#app .p-tabview .p-tabview-panels {
  padding: 0em;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
