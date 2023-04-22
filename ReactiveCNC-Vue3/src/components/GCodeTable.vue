<script setup lang="ts">
import { GCode } from "../GCode.ts";
const props = defineProps({
  gcode: GCode
})
</script>

<template>
    <DataTable class="gridfont" showGridlines scrollable scrollHeight="20em" :value="props.gcode?.lines">
        <Column field="active" header="" class=" m-0 p-0 pl-3 pr-3">
          <template #body="props">
            <Checkbox v-model="props.data.active" :binary="true" style="text-align: center; vertical-align: middle;" />
          </template>
        </Column>
        <Column field="line" header="Line" class="m-0 p-0 pl-1 pr-1">
          <template #body="props">
            <div style="text-align: center;">{{ props.data.line }}</div>
          </template>
        </Column>
        <Column field="highlight" header="G-Code" class="m-0 p-0 pl-3 pr-3">
          <template #body="props">
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
