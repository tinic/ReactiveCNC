<script setup lang="ts">
import { ref, onMounted } from "vue";
import { mdiLinesRef, MDILine } from "../MDI.ts";
import DataTable from "primevue/datatable";

const rowSelectionRef = ref();
const dataTableRef = ref<DataTable>();

export interface Props {
  disabled: boolean;
  scrollHeight: number;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  scrollHeight: 22,
});

const currentMdiLine = ref<string>("");
const updateCurrentMdiLine = () => {
  mdiLinesRef.value.push(new MDILine(currentMdiLine.value));
};

const onRowSelection = (item: any) => {
  currentMdiLine.value = item.gcode;
};

const onDeleteKey = () => {
  let index = mdiLinesRef.value.indexOf(rowSelectionRef.value);
  mdiLinesRef.value.splice(index, 1);
  currentMdiLine.value = "";
};

const dataTableScrollHeight = () => {
  return props.scrollHeight - 3 + "em";
};

onMounted(() => {
  document.addEventListener("mdiPanelRun", function () {});
  document.addEventListener("mdiPanelClearHistory", function () {
    mdiLinesRef.value.length = 0;
    currentMdiLine.value = "";
  });
});
</script>

<template>
  <div :class="{ disabled: props.disabled }" class="relative h-full">
    <div class="">
      <DataTable
        ref="dataTableRef"
        v-model:selection="rowSelectionRef"
        v-on:keyup.delete="onDeleteKey"
        @update:selection="onRowSelection"
        :value="mdiLinesRef"
        showGridlines
        scrollable
        :scrollHeight="dataTableScrollHeight()"
        selectionMode="single"
        dataKey="uuid"
      >
        <Column
          field="highlight"
          header="G-code"
          class="gridfont m-0 p-0 pl-2 pr-0 w-full"
        >
          <template #body="props: any">
            <div v-html="props.data.highlight" class="gridfont"></div>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="absolute bottom-0 w-full p-2">
      <div class="flex" style="height: 3em">
        <InputText
          class="w-full gridfont"
          v-model="currentMdiLine"
          @change="updateCurrentMdiLine()"
        ></InputText>
        <Button label="RUN" class="flex ml-2 pl-6 pr-6"></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gridfont {
  font-family: "iosevka";
  font-weight: regular;
  font-size: 1.5em;
  text-align: left;
}
</style>
