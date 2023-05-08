<script setup lang="ts">
import { onMounted } from "vue";

import ModePanels from "./components/ModePanels.vue";
import MainMenu from "./components/MainMenu.vue"

onMounted(() => {
});

</script>

<template>
  <MainMenu></MainMenu>
  <ModePanels></ModePanels>
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

.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
