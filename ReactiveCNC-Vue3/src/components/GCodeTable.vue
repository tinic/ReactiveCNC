<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gcodeLinesRef, GCodeLine } from "../GCode.ts";
import VirtualScroller from "primevue/virtualscroller";

const rowSelectionRef = ref();
const dataTableRef = ref(null);
const headerTriCheckboxRef = ref(null);

var virtualScroller: VirtualScroller;

const emit = defineEmits([
  "rowSelect"
]);

export interface Props {
  disabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
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

function updateGCodeLineActive(uuid: string, value: boolean) {
  if (!gcodeLinesRef.value) {
    return;
  }
  let line = gcodeLinesRef.value.find((item: GCodeLine) => item.uuid == uuid);
  if (!line) {
    return;
  }
  line.active = value;
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
        updateGCodeLineActive(line.uuid, line.active);
      });
    } else {
      lines.forEach((line) => {
        line.active = false;
        updateGCodeLineActive(line.uuid, line.active);
      });
    }
  } else {
    lines.forEach((line) => {
      line.active = line.shadowactive;
      updateGCodeLineActive(line.uuid, line.active);
    });
  }
};

const updateLineCheckbox = (line: GCodeLine) => {
  line.shadowactive = line.active;
  headerTriCheckboxRef.value = null;
  updateGCodeLineActive(line.uuid, line.active);
};

const updateGCode = (line: GCodeLine) => {
  updateGCodeLineEditCode(line.uuid, line.editedcode);
};

const scrollToRow = (index: number) => {
  if (!dataTableRef.value) {
    return;
  }
  virtualScroller.scrollToIndex(index);
};

const selectRow = (index:number) => {
  if (!dataTableRef.value) {
    return;
  }
  index;
}

const onRowSelection = (item:GCodeLine) => {
  emit("rowSelect", item);
}

onMounted(() => {
  virtualScroller = (dataTableRef.value as any).getVirtualScrollerRef();
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
      scrollHeight="20em"
      :virtualScrollerOptions="{ itemSize: 30 }"
      selectionMode="single"
      dataKey="uuid"
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
        header="G-Code"
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
  font-size: 1.5em;
  text-align: left;
}

.editfont {
  font-family: "iosevka";
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
  opacity: 1;
}
</style>
