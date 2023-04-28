<script setup lang="ts">
import gcode from "./GCode.ts";
import { GCodeLine } from "./GCode.ts"
import GCodeTable from './components/GCodeTable.vue';
import { ref, onMounted } from 'vue';

const gcoderef = ref();

onMounted(() => {
  gcode.loadFromURL("/src/assets/gcode.txt").then(()=> {
    gcoderef.value = gcode; 
  })
})

const updateGCodeLineEditCode = ((uuid:string, gcode:string) => {
  var line = gcoderef.value.lines.find((item:GCodeLine) => item.uuid == uuid);
  if (line != null) {
    line.setEditCode(gcode);
  }
});

const updateGCodeLineActive = ((uuid:string, value:boolean) => {
  var line = gcoderef.value.lines.find((item:GCodeLine) => item.uuid == uuid);
  if (line != null) {
    line.active = value;
  }
});

</script>

<template>
  <GCodeTable 
    :gcode=gcoderef
    @updateGCodeLineEditCode=updateGCodeLineEditCode
    @updateGCodeLineActive=updateGCodeLineActive
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
