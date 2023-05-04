<script setup lang="ts">

import GCodePanel from "./GCodePanel.vue";
import MDIPanel from "./MDIPanel.vue";
import JogPanel from "./JogPanel.vue";

import { ref, onMounted } from "vue";

const jogPanelRef = ref();
const activeIndex = ref(0);

const onActiveIndex = () => {
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

onMounted(() => {
  onActiveIndex();
});
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
      <GCodePanel
        :disabled="false"
        style="width: 600px; height: 25em"
      >
      </GCodePanel>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-calculator m-0 p-0 pr-2" style="font-size: 1.5rem" />
        <span>MDI</span>
      </template>
      <div style="width: 600px; height: 25em">
        <MDIPanel> </MDIPanel>
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
#app .p-tabview-header {
  font-weight: regular;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
}

#app .p-tabview .p-tabview-panels {
  padding: 0em;
}
</style>