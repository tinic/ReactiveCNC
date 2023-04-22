<script setup lang="ts">
import { GCode } from "../GCode.ts";
const props = defineProps({
  gcode: GCode
})
</script>
<template>
    <DataTable :value="props.gcode?.lines">
        <Column field="line" header="Line"></Column>
        <Column field="highlight" header="Code"></Column>
    </DataTable>
</template> 
