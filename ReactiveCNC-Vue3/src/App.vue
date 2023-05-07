<script setup lang="ts">
import { onMounted } from "vue";
import { loadGCodeFromURL } from "./GCode.ts";
import ModePanels from "./components/ModePanels.vue";

onMounted(() => {
  loadGCodeFromURL("/src/assets/gcode.txt");
});

</script>

<template>
  <ModePanels class="modepanel"></ModePanels>
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

.modepanel {
  position: absolute;
  top: 1em;
  left: 1em;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
