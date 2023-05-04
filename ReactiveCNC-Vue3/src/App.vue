<script setup lang="ts">
import { loadGCodeFromURL } from "./GCode.ts";
import GCodeTable from "./components/GCodeTable.vue";
import MDITable from "./components/MDITable.vue";
import JogPanel from "./components/JogPanel.vue";
import { ref, onMounted } from "vue";

const gcodeTable = ref();

onMounted(() => {
  loadGCodeFromURL("/src/assets/gcode.txt");
});

const jogPanelRef = ref();

const activeIndex = ref(0);
const onActiveIndex = () => {
  console.log("onActiveIndex " + activeIndex.value);
  switch (activeIndex.value) {
    case 0:
      jogPanelRef.value.removeKeyboardHandler();
      break;
    case 1:
      jogPanelRef.value.removeKeyboardHandler();
      break;
    case 2:
      jogPanelRef.value.installKeyboardHandler();
      break;
  }
};
</script>

<template>
  <TabView
    v-model:activeIndex="activeIndex"
    @update:activeIndex="onActiveIndex"
  >
    <TabPanel>
      <template #header>
        <i class="pi pi-cog m-0 p-0 pr-2" style="font-size: 1.5rem" />
        <span>PROGRAM</span>
      </template>
      <GCodeTable
        ref="gcodeTable"
        :disabled="false"
        style="width: 600px; height: 25em"
      >
      </GCodeTable>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-calculator m-0 p-0 pr-2" style="font-size: 1.5rem" />
        <span>MDI</span>
      </template>
      <div style="width: 600px; height: 25em">
        <MDITable> </MDITable>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-arrows-alt m-0 p-0 pr-2" style="font-size: 1.5rem" />
        <span>JOG</span>
      </template>
      <div style="width: 600px; height: 25em">
        <JogPanel ref="jogPanelRef"> </JogPanel>
      </div>
    </TabPanel>
  </TabView>
</template>

<style>
.wrapper,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app .p-tabview-header {
  font-weight: regular;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
}

#app .p-tabview .p-tabview-panels {
  padding: 0em;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
