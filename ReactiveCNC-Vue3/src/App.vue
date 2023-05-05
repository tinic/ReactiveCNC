<script setup lang="ts">
import { onMounted } from "vue";
import { loadGCodeFromURL } from "./GCode.ts";
import ModePanels from "./components/ModePanels.vue";

onMounted(() => {
  loadGCodeFromURL("/src/assets/gcode.txt");
});
</script>

<template>
  <ModePanels></ModePanels>
</template>

<style>
.wrapper,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
