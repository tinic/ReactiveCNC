<script setup lang="ts">
import GCodePanel from "./GCodePanel.vue";
import MDIPanel from "./MDIPanel.vue";
import JogPanel from "./JogPanel.vue";

import { ref, onMounted } from "vue";

const cellHeight: number = 37;
const cellCenterOffset: number = 7;
const scrollHeight = "20.5em";

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

const onJog = (axis: string, mode: string, speed: string, state: string) => {
  console.log(axis + " " + mode + " " + speed + " " + state);
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
        :scrollHeight="scrollHeight"
        :cellHeight="cellHeight"
        :cellCenterOffset="cellCenterOffset"
        :disabled="false"
        style="width: 600px; height: 21em"
      >
      </GCodePanel>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-calculator m-0 p-0 pr-2" style="font-size: 1.5rem" />
        <span>MDI</span>
      </template>
      <div style="width: 600px; height: 21em">
        <MDIPanel :disabled="false"> </MDIPanel>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-arrows-alt m-0 p-0 pr-2" style="font-size: 1.5rem" />
        <span>JOG</span>
      </template>
      <div style="width: 600px; height: 21em">
        <JogPanel :disabled="false" ref="jogPanelRef" @jog="onJog"> </JogPanel>
      </div>
    </TabPanel>
  </TabView>
</template>

<style>
#app .p-tabview-header {
  font-weight: regular;
  font-size: 1.25em;
  padding: 0;
  margin: 0;
}

#app .p-tabview .p-tabview-panels {
  padding: 0em;
}
</style>
