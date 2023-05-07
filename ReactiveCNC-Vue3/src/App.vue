<script setup lang="ts">
import { onMounted } from "vue";
import { loadGCodeFromURL } from "./GCode.ts";
import ModePanels from "./components/ModePanels.vue";
import MainMenu from "./components/MainMenu.vue"

onMounted(() => {
  loadGCodeFromURL("/src/assets/gcode.txt");
});

</script>

<template>

  <MainMenu class="mainmenu"></MainMenu>
  <ModePanels class="modepanels"></ModePanels>
</template>

<style>
.wrapper,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #ccc;
}

.modepanels {
  position: absolute;
  top: 1em;
  left: 1em;
}

.mainmenu {
  position: absolute;
  bottom: 0;
  left: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
