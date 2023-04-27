<script setup lang="ts">
import { ref } from "vue"
import { GCode } from "../GCode.ts";
import { GCodeLine } from "../GCode.ts";
const props = defineProps({
  gcode: GCode
})

const lineTriCheck = ref(null);
const updateLineTriCheck = (() => {
  if (!props.gcode) {
    return;
  }
  let lines = props.gcode?.lines;
  if (lineTriCheck.value != null) {
    if (lineTriCheck.value == true) {
      lines.forEach( (line) => {
        line.shadowactive = line.active;
        line.active = true;
      });
    } else {
      lines.forEach( (line) => {
        line.active = false;
      });
    }
  } else {
    lines.forEach( (line) => {
      line.active = line.shadowactive;
    });
  }
});

const updateLineCheck = ((line:GCodeLine) => {
  line.shadowactive = line.active;
  lineTriCheck.value = null;
});
</script>

<template>
    <DataTable class="gridfont" showGridlines scrollable scrollHeight="20em" :value="props.gcode?.lines">
        <Column field="active" header="" class=" m-0 p-0 pl-3 pr-3">
          <template #header="">
            <TriStateCheckbox v-model="lineTriCheck" @update:modelValue="updateLineTriCheck" style="text-align: center; vertical-align: middle;" />
          </template>
          <template #body="props:any">
            <Checkbox v-model="props.data.active" @change="updateLineCheck(props.data)" :binary="true" style="text-align: center; vertical-align: middle;" />
          </template>
        </Column>
        <Column field="line" header="Line" class="m-0 p-0 pl-1 pr-1">
          <template #body="props:any">
            <div style="text-align: center;">{{ props.data.line }}</div>
          </template>
        </Column>
        <Column field="highlight" header="G-Code" class="m-0 p-0 pl-3 pr-3">
          <template #body="props:any">
            <div v-html="props.data.highlight"></div>
          </template>
        </Column>
    </DataTable>
</template> 

<style scoped>
.gridfont {
  font-family: 'iosevka';
  font-weight: regular;
  font-size: 1.5em;
  text-align: left;
}
</style>
