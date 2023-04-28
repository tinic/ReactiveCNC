<script setup lang="ts">
import { ref } from "vue"
import { gcoderef, GCodeLine } from "../GCode.ts";

function updateGCodeLineEditCode(uuid:string, gcode:string) {
  if (!gcoderef.value) {
    return;
  }
  let line = gcoderef.value.lines.find((item:GCodeLine) => item.uuid == uuid);
  if (!line) {
    return;
  }
  line.setEditCode(gcode);
};

function updateGCodeLineActive(uuid:string, value:boolean) {
  if (!gcoderef.value) {
    return;
  }
  let line = gcoderef.value.lines.find((item:GCodeLine) => item.uuid == uuid);
  if (!line) {
    return;
  }
  line.active = value;
};

const headerTriCheckbox = ref(null);
const updateheaderTriCheckbox = (() => {
  if (!gcoderef.value) {
    return;
  }
  let lines = gcoderef.value?.lines;
  if (headerTriCheckbox.value != null) {
    if (headerTriCheckbox.value == true) {
      lines.forEach( (line) => {
        line.shadowactive = line.active;
        line.active = true;
        updateGCodeLineActive(line.uuid, line.active);
      });
    } else {
      lines.forEach( (line) => {
        line.active = false;
        updateGCodeLineActive(line.uuid, line.active);
      });
    }
  } else {
    lines.forEach( (line) => {
      line.active = line.shadowactive;
      updateGCodeLineActive(line.uuid, line.active);
    });
  }
});

const updateLineCheckbox = ((line:GCodeLine) => {
  line.shadowactive = line.active;
  headerTriCheckbox.value = null;
  updateGCodeLineActive(line.uuid, line.active);
});

const updateGCode = ((line:GCodeLine) => {
  updateGCodeLineEditCode(line.uuid, line.editedcode);
});
</script>

<template>
  <DataTable class="gridfont" editMode="cell" tableClass="editable-cells-table" showGridlines scrollable scrollHeight="20em" :value="gcoderef.lines">
    <Column field="active" header="" class=" m-0 p-0 pl-3 pr-3">
      <template #header="">
        <TriStateCheckbox v-model="headerTriCheckbox" @update:modelValue="updateheaderTriCheckbox" style="text-align: center; vertical-align: middle;" />
      </template>
      <template #body="props:any">
        <Checkbox v-model="props.data.active" @change="updateLineCheckbox(props.data)" :binary="true" style="text-align: center; vertical-align: middle;" />
      </template>
    </Column>
    <Column field="line" header="Line" class="m-0 p-0 pl-3 pr-3">
      <template #body="props:any">
        <div style="text-align: center;">{{ props.data.line }}</div>
      </template>
    </Column>
    <Column field="highlight" header="G-Code" class="m-0 p-0 pl-3 pr-3">
      <template #editor="props:any">
        <InputText v-model="props.data.editedcode" @change="updateGCode(props.data as GCodeLine)" class="editfont w-full m-0 p-0 pl-1 pr-3" autofocus />
      </template>
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

.editfont {
  font-family: 'iosevka';
  font-weight: regular;
  font-size: 1em;
  text-align: left;
}

::v-deep(.editable-cells-table td.p-cell-editing) {
    padding-top: 0;
    padding-bottom: 0;
}

</style>
