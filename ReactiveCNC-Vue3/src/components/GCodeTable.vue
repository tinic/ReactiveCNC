<script setup lang="ts">
import { ref } from "vue"
import { gcodeLinesRef, GCodeLine } from "../GCode.ts";

export interface Props {
  disabled: Boolean
};

const props = withDefaults(defineProps<Props>(), {
//  disabled: false
});

function updateGCodeLineEditCode(uuid:string, gcode:string) {
  if (!gcodeLinesRef.value) {
    return;
  }
  let line = gcodeLinesRef.value.find((item:GCodeLine) => item.uuid == uuid);
  if (!line) {
    return;
  }
  line.setEditCode(gcode);
};

function updateGCodeLineActive(uuid:string, value:boolean) {
  if (!gcodeLinesRef.value) {
    return;
  }
  let line = gcodeLinesRef.value.find((item:GCodeLine) => item.uuid == uuid);
  if (!line) {
    return;
  }
  line.active = value;
};

const headerTriCheckbox = ref(null);
const updateheaderTriCheckbox = (() => {
  if (!gcodeLinesRef.value) {
    return;
  }
  let lines = gcodeLinesRef.value;
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


const dataTable = ref(null);
const scrollToRow = ((index:number) => {
  index;
})

defineExpose({
  dataTable,
  scrollToRow
})

</script>

<template>
  <div :class="{ 'disabled': props.disabled }">
  <DataTable ref="dataTable" :value="gcodeLinesRef" class="gridfont" editMode="cell" tableClass="editable-cells-table" showGridlines scrollable scrollHeight="20em" :virtualScrollerOptions="{ itemSize:30 }">
    <Column field="active" header="" class="m-0 p-0 pl-3 pr-3 w-min" style="width:5em">
      <template #header="">
        <TriStateCheckbox v-model="headerTriCheckbox" @update:modelValue="updateheaderTriCheckbox" style="text-align: center; align-content: center; vertical-align: middle;" />
      </template>
      <template #body="props:any">
        <Checkbox v-model="props.data.active" @change="updateLineCheckbox(props.data)" :binary="true" style="text-align: center; align-content: center; vertical-align: middle;" />
      </template>
    </Column>
    <Column field="line" header="Line" class="m-0 p-0 pl-2 pr-2 w-min" style="width:5em">
      <template #body="props:any">
        <div style="text-align: center;">{{ props.data.line }}</div>
      </template>
    </Column>
    <Column field="highlight" header="G-Code" class="m-0 p-0 pl-2 pr-0 w-full">
      <template #editor="props:any">
        <InputText v-model="props.data.editedcode" @change="updateGCode(props.data as GCodeLine)" class="editfont w-full m-0 p-0" autofocus />
      </template>
      <template #body="props:any">
        <div v-html="props.data.highlight"></div>
      </template>
    </Column>
  </DataTable>
  </div>
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

.disabled {
  pointer-events: none;
  opacity: 1.0;
}

</style>
