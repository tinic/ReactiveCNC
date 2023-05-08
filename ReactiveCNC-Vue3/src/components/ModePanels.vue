<script setup lang="ts">
import GCodePanel from "./GCodePanel.vue";
import MDIPanel from "./MDIPanel.vue";
import JogPanel from "./JogPanel.vue";

import { ref, onMounted } from "vue";

const cellHeight: number = 37;
const cellCenterOffset: number = 7;
const scrollHeight = "22em";

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
  <div class="modepanels">
    <Card v-if="activeIndex == 0">
      <template #content>
        <GCodePanel
          :scrollHeight="scrollHeight"
          :cellHeight="cellHeight"
          :cellCenterOffset="cellCenterOffset"
          :disabled="false"
          style="width: 600px; height: 23em"
        >
        </GCodePanel>
      </template>
    </Card>
    <Card v-if="activeIndex == 1">
      <template #content>
        <div style="width: 600px; height: 23em">
          <MDIPanel :disabled="false"> </MDIPanel>
        </div>
      </template>
    </Card>
    <Card v-if="activeIndex == 2">
      <template #content>
        <div style="width: 600px; height: 23em">
          <JogPanel :disabled="false" ref="jogPanelRef" @jog="onJog">
          </JogPanel>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.modepanels {
  position: absolute;
  top: 0.25em;
  left: 0.25em;
}
</style>

<style>
#app .p-card-body {
  padding: 0.25em;
}
#app .p-card-content {
  padding: 0em;
}
</style>
