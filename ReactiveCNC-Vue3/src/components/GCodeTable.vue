<script setup lang="ts">

import { ref, onMounted } from "vue";
import { gcodeLinesRef, GCodeLine } from "../GCode.ts";

import VirtualScroller from "primevue/virtualscroller";
import DataTable from "primevue/datatable";
import Checkbox from "primevue/checkbox";

const rowSelectionRef = ref();
const dataTableRef = ref<DataTable>();
const virtualScrollerRef = ref<VirtualScroller>();
const headerTriCheckboxRef = ref(null);

const emit = defineEmits([
  "rowSelect"
]);

export interface Props {
  disabled: boolean;
  cellHeight: number;
  cellCenterOffset: number;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  cellHeight: 37,
  cellCenterOffset: 7
});

function updateGCodeLineEditCode(uuid: string, gcode: string) {
  if (!gcodeLinesRef.value) {
    return;
  }
  let line = gcodeLinesRef.value.find((item: GCodeLine) => item.uuid == uuid);
  if (!line) {
    return;
  }
  line.setEditCode(gcode);
}

const updateheaderTriCheckbox = () => {
  if (!gcodeLinesRef.value) {
    return;
  }
  let lines = gcodeLinesRef.value;
  if (headerTriCheckboxRef.value != null) {
    if (headerTriCheckboxRef.value == true) {
      lines.forEach((line) => {
        line.shadowactive = line.active;
        line.active = true;
        gcodeLinesRef.value[line.index].active = line.active;
      });
    } else {
      lines.forEach((line) => {
        line.active = false;
        gcodeLinesRef.value[line.index].active = line.active;
      });
    }
  } else {
    lines.forEach((line) => {
      line.active = line.shadowactive;
      gcodeLinesRef.value[line.index].active = line.active;
    });
  }
};

const updateLineCheckbox = (line: GCodeLine) => {
  line.shadowactive = line.active;
  headerTriCheckboxRef.value = null;
  gcodeLinesRef.value[line.index].active = line.active;
};

const updateGCode = (line: GCodeLine) => {
  updateGCodeLineEditCode(line.uuid, line.editedcode);
};

const scrollToRow = (index: number) => {
  if (!gcodeLinesRef.value) {
    return;
  }
  if (!virtualScrollerRef.value) {
    return;
  }
  virtualScrollerRef.value.scrollTo({left:0, top:index * props.cellHeight});
};

const selectRow = (index:number) => {
  if (!dataTableRef.value) {
    return;
  }
  scrollToRow(Math.max(0,index - props.cellCenterOffset));
  rowSelectionRef.value = [gcodeLinesRef.value[index]];
}

const onRowSelection = (item:any) => {
  emit("rowSelect", item);
}

onMounted(() => {
  virtualScrollerRef.value = (dataTableRef.value as any).getVirtualScrollerRef();
});

defineExpose({
  scrollToRow,
  selectRow
});
</script>

<template>
  <div :class="{ disabled: props.disabled }">
    <DataTable
      ref="dataTableRef"
      v-model:selection="rowSelectionRef"
      @update:selection="onRowSelection"
      :value="gcodeLinesRef"
      class="gridfont"
      editMode="cell"
      tableClass="editable-cells-table"
      showGridlines
      scrollable
      scrollHeight="400px"
      selectionMode="single"
      dataKey="uuid"
      :virtualScrollerOptions="{ itemSize: props.cellHeight }"
    >
      <Column
        field="active"
        header=""
        class="m-0 p-0 pl-3 pr-3 w-min"
        style="width: 5em"
      >
        <template #header="">
          <TriStateCheckbox
            v-model="headerTriCheckboxRef"
            @update:modelValue="updateheaderTriCheckbox"
            style="
              text-align: center;
              align-content: center;
              vertical-align: middle;
            "
          />
        </template>
        <template #body="props: any">
          <Checkbox
            v-model="props.data.active"
            @change="updateLineCheckbox(props.data)"
            :binary="true"
            style="
              text-align: center;
              align-content: center;
              vertical-align: middle;
            "
          />
        </template>
      </Column>
      <Column
        field="line"
        header="Line"
        class="m-0 p-0 pl-3 pr-3 w-min"
        style="width: 5em"
      >
        <template #body="props: any">
          <div style="text-align: center">{{ props.data.line }}</div>
        </template>
      </Column>
      <Column
        field="highlight"
        header="G-code"
        class="m-0 p-0 pl-2 pr-0 w-full"
      >
        <template #editor="props: any">
          <InputText
            v-model="props.data.editedcode"
            @change="updateGCode(props.data as GCodeLine)"
            class="editfont w-full m-0 p-0"
            autofocus
          />
        </template>
        <template #body="props: any">
          <div v-html="props.data.highlight"></div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.gridfont {
  font-family: "iosevka";
  font-weight: regular;
  font-size: 1.25em;
  text-align: left;
}

.editfont {
  font-family: "iosevka";
  font-weight: regular;
  font-size: 1em;
  text-align: left;
}

:deep(*) {
  transition: none !important;
}

.disabled {
  pointer-events: none;
  opacity: 1;
}
</style>
