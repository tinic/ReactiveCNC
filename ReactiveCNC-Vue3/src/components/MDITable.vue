<script setup lang="ts">

import { ref, onMounted } from "vue";
import { mdiLinesRef, MDILine, mdi } from "../MDI.ts";
import DataTable from "primevue/datatable";

const rowSelectionRef = ref();
const dataTableRef = ref<DataTable>();

const emit = defineEmits([
  "rowSelect"
]);

export interface Props {
    disabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
});

const currentMdiLine = ref<string>('');
const updateCurrentMdiLine = (() => {
    console.log(currentMdiLine.value);
    mdiLinesRef.value.push(new MDILine(currentMdiLine.value));
})

const onRowSelection = (item:any) => {
  emit("rowSelect", item);
}
</script>

<template>
    <div :class="{ disabled: props.disabled }">
    <DataTable
      ref="dataTableRef"
      v-model:selection="rowSelectionRef"
      @update:selection="onRowSelection"
      :value="mdiLinesRef"
      class="gridfont"
      showGridlines
      scrollable
      scrollHeight="14em"
      selectionMode="single"
      dataKey="uuid">
      <Column
        field="highlight"
        header="G-Code"
        class="m-0 p-0 pl-2 pr-0 w-full">
        <template #body="props: any">
          <div v-html="props.data.highlight"></div>
        </template>
      </Column>
    </DataTable>
    <div class="flex flex-auto" style="height:3em">
        <InputText 
            class="w-full editfont"
            v-model="currentMdiLine"
            @change="updateCurrentMdiLine()"
        ></InputText>
        <Button label="RUN" class="flex pl-6 pr-6"></Button>
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
.editfont {
    font-family: "iosevka";
    font-weight: regular;
    font-size: 1.5em;
    text-align: left;
}
</style>
