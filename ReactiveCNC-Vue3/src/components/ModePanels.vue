<script setup lang="ts">
import GCodePanel from "./GCodePanel.vue";
import MDIPanel from "./MDIPanel.vue";
import JogPanel from "./JogPanel.vue";
import DefaultPanel from "./DefaultPanel.vue";

import { ref, onMounted } from "vue";

const cellHeight: number = 37;
const cellCenterOffset: number = 7;
const scrollHeight: number = 23;

const jogPanelRef = ref();
const activeMode = ref(0);

const onActiveMode = () => {
  switch (activeMode.value) {
    default:
    case 0:
    case 1:
    case 2:
      jogPanelRef.value.removeKeyboardHandler();
      break;
    case 3:
      jogPanelRef.value.installKeyboardHandler();
      break;
  }
};

const onJog = (axis: string, mode: string, speed: string, state: string) => {
  console.log(axis + " " + mode + " " + speed + " " + state);
};

function setActiveMode(index: number) {
  activeMode.value = index;
  onActiveMode();
}

onMounted(() => {
  onActiveMode();
  document.addEventListener("setGlobalMode", function (event: Event) {
    let e = event as CustomEvent<number>;
    switch (e.detail) {
      case 0:
      case 1:
      case 2:
      case 3:
        setActiveMode(e.detail);
        break;
    }
  });
});
</script>

<template>
  <div class="modepanels">
    <Card v-show="activeMode == 0">
      <template #content>
        <DefaultPanel
          :disabled="false"
          style="width: 600px; height: 23em"
        ></DefaultPanel>
      </template>
    </Card>
    <Card v-show="activeMode == 1">
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
    <Card v-show="activeMode == 2">
      <template #content>
        <div style="width: 600px; height: 23em">
          <MDIPanel :scrollHeight="scrollHeight" :disabled="false"> </MDIPanel>
        </div>
      </template>
    </Card>
    <Card v-show="activeMode == 3">
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
