<script setup lang="ts">
import { ref } from "vue";

const mainMenuStack = ref([]);

const mainMenu = ref([
    {
        index: 0,
        label: "G-code",
        fkey: "F1",
        submenu: [ 
            {
                index: 0,
                label: "Load",
                fkey: ["F1"],
            },
            {
                index: 1,
                label: "Run",
                fkey: ["F2"],
            },
            {
                index: 2,
                label: "Pause",
                fkey: ["F3"],
            },
            {
                index: 3,
                label: "Jump to Start",
                fkey: ["F4"],
            },
            {
                index: 7,
                label: "Back",
                fkey: ["ESC","F8"],
            },
        ]
    },
    {
        index: 1,
        label: "MDI",
        fkey: ["F2"],
    },
    {
        index: 2,
        label: "JOG",
        fkey: ["F3"],
    },
    {
        index: 7,
        label: "Quit",
        fkey: ["F8"],
    },
]);

mainMenu;
mainMenuStack;

</script>

<template>
  <div class="flex p-1 w-full" style="height:8em">
    <div class="grid m-0 w-full">
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
      <div class="col8"><Button class="w-full h-full">G-code</Button></div>
    </div>
  </div>
</template>

<style scoped>
.col8 {
    width: 11.5%;
    margin: 0.5%;
}
</style>

