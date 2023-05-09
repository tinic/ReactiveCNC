<script setup lang="ts">
import { ref, onMounted } from "vue";
import { loadGCodeFromURL } from "../GCode.ts";

const breadcrumbHome = ref({
  icon: "pi pi-home",
  to: "/",
});

const gcodeMist = ref(false);
const gcodeFlood = ref(false);
const gcodeOptionalStop = ref(true);
const gcodeOptionalBlock = ref(true);
const gcodePauseSpindle = ref(false);

const mainMachineOnOff = ref(false);
const mainEStopReset = ref(false);

const breadcrumbItems = ref([]);

const mainMenuStack = ref(Array<number>());
const mainMenu = ref([
  {
    index: 0,
    bread: "G-code",
    label: function():string {
      return "<span class='mainmenu-label'><span class='pi pi-cog pr-2'></span>G-code</span>";
    },
    fnkey: ["F1"],
    ffunc: () => {
      setGlobalMode(1);
      mainMenuStack.value.push(0);
      breadcrumbItems.value.push({ label: "G-code" } as never);
    },
    smenu: [
      {
        index: 0,
        bread: "Load",
        label: function():string {
          return "<span class='mainmenu-label'>Load</span>";
        },
        fnkey: ["F1"],
        ffunc: () => {
          loadGCodeFromURL("/src/assets/gcode.txt");
        },
      },
      {
        index: 1,
        bread: "Cycle Start",
        label: function():string {
          return "<span class='mainmenu-label'>Cycle Start</span>";
        },
        fnkey: ["F2"],
        ffunc: () => {},
      },
      {
        index: 2,
        bread: "Pause",
        label: function():string {
          return "<span class='mainmenu-label'>Pause</span>";
        },
        fnkey: ["F3"],
        ffunc: () => {},
      },
      {
        index: 3,
        bread: "Stop",
        label: function():string {
          return "<span class='mainmenu-label'>Stop</span>";
        },
        fnkey: ["F4"],
        ffunc: () => {},
      },
      {
        index: 4,
        bread: "Step",
        label: function():string {
          return "<span class='mainmenu-label'>Step</span>";
        },
        fnkey: ["F5"],
        ffunc: () => {},
      },
      {
        index: 5,
        bread: "Goto Zero",
        label: function():string {
          return "<span class='mainmenu-label'>Goto Zero</span>";
        },
        fnkey: ["F6"],
        ffunc: () => {},
      },
      {
        index: 6,
        bread: "Mist",
        label: function():string {
          return "<span class='mainmenu-label'>Mist</span>";
        },
        fnkey: ["F7"],
        onoff: () => {
          return gcodeMist.value;
        },
        ffunc: () => {
          gcodeMist.value = !gcodeMist.value;
        },
      },
      {
        index: 7,
        bread: "Flood",
        label: function():string {
          return "<span class='mainmenu-label'>Flood</span>";
        },
        fnkey: ["F8"],
        onoff: () => {
          return gcodeFlood.value;
        },
        ffunc: () => {
          gcodeFlood.value = !gcodeFlood.value;
        },
      },
      {
        index: 8,
        bread: "Options",
        label: function():string {
          return "<span class='mainmenu-label'>Options</span>";
        },
        fnkey: ["F9"],
        ffunc: () => {
          mainMenuStack.value.push(8);
          breadcrumbItems.value.push({ label: "Options" } as never);
        },
        smenu: [
          {
            index: 0,
            bread: "Optional Stop",
            label: function():string {
              return "<span class='mainmenu-label'>Optional Stop</span>";
            },
            fnkey: ["F1"],
            onoff: () => {
              return gcodeOptionalStop.value;
            },
            ffunc: () => {
              gcodeOptionalStop.value = !gcodeOptionalStop.value;
            },
          },
          {
            index: 1,
            bread: "Optional Block",
            label: function():string {
              return "<span class='mainmenu-label'>Optional Block</span>";
            },
            fnkey: ["F2"],
            onoff: () => {
              return gcodeOptionalBlock.value;
            },
            ffunc: () => {
              gcodeOptionalBlock.value = !gcodeOptionalBlock.value;
            },
          },
          {
            index: 2,
            bread: "Pause Spindle",
            label: function():string {
              return "<span class='mainmenu-label'>Pause Spindle</span>";
            },
            fnkey: ["F3"],
            onoff: () => {
              return gcodePauseSpindle.value;
            },
            ffunc: () => {
              gcodePauseSpindle.value = !gcodePauseSpindle.value;
            },
          },
          {
            index: 9,
            bread: "Back",
            label: function():string {
              return "<span class='mainmenu-label'>Back</span>";
            },
            fnkey: ["ESC", "F10"],
            ffunc: () => {
              mainMenuStack.value.pop();
              breadcrumbItems.value.pop();
            },
          },
        ],
      },
      {
        index: 9,
        bread: "Stop/Back",
        label: function():string {
          return "<span class='mainmenu-label'>Stop/Back</span>";
        },
        fnkey: ["ESC", "F10"],
        ffunc: () => {
          setGlobalMode(0);
          mainMenuStack.value.pop();
          breadcrumbItems.value.pop();
        },
      },
    ],
  },
  {
    index: 1,
    bread: "MDI",
    label: function():string {
      return "<span class='mainmenu-label'><span class='pi pi-calculator pr-2'></span>MDI</span>";
    },
    fnkey: ["F2"],
    ffunc: () => {
      setGlobalMode(2);
      mainMenuStack.value.push(1);
      breadcrumbItems.value.push({ label: "MDI" } as never);
    },
    smenu: [
      {
        index: 0,
        bread: "Run",
        label: function():string {
          return "<span class='mainmenu-label'>Run</span>";
        },
        fnkey: ["F1"],
        ffunc: () => {
          document.dispatchEvent(new Event("mdiPanelRun"));
        },
      },
      {
        index: 1,
        bread: "Clear History",
        label: function():string {
          return "<span class='mainmenu-label'>Clear History</span>";
        },
        fnkey: ["F2"],
        ffunc: () => {
          document.dispatchEvent(new Event("mdiPanelClearHistory"));
        },
      },
      {
        index: 9,
        bread: "Back",
        label: function():string {
          return "<span class='mainmenu-label'>Back</span>";
        },
        fnkey: ["ESC", "F10"],
        ffunc: () => {
          setGlobalMode(0);
          mainMenuStack.value.pop();
          breadcrumbItems.value.pop();
        },
      },
    ],
  },
  {
    index: 2,
    bread: "JOG",
    label: function():string {
      return "<span class='mainmenu-label'><span class='pi pi-arrows-alt pr-2'></span>JOG</span>";
    },
    fnkey: ["F3"],
    ffunc: () => {
      setGlobalMode(3);
      mainMenuStack.value.push(2);
      breadcrumbItems.value.push({ label: "JOG" } as never);
    },
    smenu: [
      {
        index: 9,
        bread: "Back",
        label: function():string {
          return "<span class='mainmenu-label'>Back</span>";
        },
        fnkey: ["ESC", "F10"],
        ffunc: () => {
          setGlobalMode(0);
          mainMenuStack.value.pop();
          breadcrumbItems.value.pop();
        },
      },
    ],
  },
  {
    index: 3,
    bread: "Tool table",
    label: function():string {
      return "<span class='mainmenu-label'>Tool table</span>";
    },
    fnkey: ["F4"],
    ffunc: () => {},
  },
  {
    index: 4,
    bread: "Tool library",
    label: function():string {
      return "<span class='mainmenu-label'>Tool library</span>";
    },
    fnkey: ["F5"],
    ffunc: () => {},
  },
  {
    index: 5,
    bread: "Machine On/Off",
    onoff: () => {
      return mainMachineOnOff.value
    },
    label: function():string {
      if (mainMachineOnOff.value) {
        return "<span class='mainmenu-label' style='color:#8f8'>Power ON</span>";
      } else {
        return "<span class='mainmenu-label' style='color:#f66'>Power OFF</span>";
      }
    },
    fnkey: ["F6"],
    ffunc: () => {
      mainMachineOnOff.value = !mainMachineOnOff.value;
    },
  },
  {
    index: 6,
    bread: "EStop",
    onoff: () => {
      return mainEStopReset.value
    },
    label: function():string {
      if (mainEStopReset.value) {
        return "<span class='mainmenu-label' style='color:#8f8'>E-stop Reset</span>";
      } else {
        return "<span class='mainmenu-label' style='color:#f66'>E-stop Engaged</span>";
      }
    },
    fnkey: ["F7"],
    ffunc: () => {
      mainEStopReset.value = !mainEStopReset.value;
    },
  },
  {
    index: 7,
    bread: "Settings",
    label: function():string {
      return "<span class='mainmenu-label'><span class='pi pi-sliders-h pr-2'></span>Settings</span>";
    },
    fnkey: ["F8"],
    ffunc: () => {},
  },
  {
    index: 8,
    bread: "Quit",
    label: function():string {
      return "<span class='mainmenu-label'>Quit</span>";
    },
    fnkey: ["F9"],
    ffunc: () => {},
  },
]);

function CurrentMenu(): any {
  var currentMenu: any = mainMenu.value;
  for (var c = 0; c < mainMenuStack.value.length; c++) {
    currentMenu = currentMenu[mainMenuStack.value[c]].smenu;
  }
  return currentMenu;
}

const ButtonLabel = (index: number) => {
  let curMenu = CurrentMenu();
  if (!curMenu) {
    return "";
  }
  const foundItem = curMenu.find(
    (item: { index: number }) => item.index === index
  );
  if (!foundItem) {
    return "";
  }
  var onoff =
    foundItem.onoff == undefined
      ? ""
      : foundItem.onoff()
      ? "<span class='pi pi-circle-fill mainmenu-onoff'></span>"
      : "<span class='pi pi-circle mainmenu-onoff'></span>";
  var mstr = foundItem.smenu
    ? "<span class='pi pi-bars mainmenu-submenu'></span>"
    : "";
  var fstr = "<span class='mainmenu-function'>";
  foundItem.fnkey.forEach((fkey: any) => {
    fstr += fkey + "/";
  });
  fstr = fstr.substring(0, fstr.length - 1);
  fstr += "</span>";
  return onoff + mstr + fstr + foundItem.label();
};

const ButtonClick = (index: number) => {
  let curMenu = CurrentMenu();
  if (!curMenu) {
    return;
  }
  const foundItem = curMenu.find(
    (item: { index: number }) => item.index === index
  );
  if (!foundItem) {
    return;
  }
  foundItem.ffunc();
};

const windowKeyDown = (event: any) => {
  if (event.key.startsWith("F") || event.key == "Escape") {
    let curMenu = CurrentMenu();
    curMenu.forEach((item: any) => {
      item.fnkey.forEach((fkey: string) => {
        if (event.key == fkey) {
          item.ffunc();
        }
      });
    });
    event.stopPropagation();
  }
};

const windowKeyUp = (event: any) => {
  if (event.key.startsWith("F") || event.key == "Escape") {
    event.stopPropagation();
  }
};

const installKeyboardHandler = () => {
  document.addEventListener("keydown", windowKeyDown);
  document.addEventListener("keyup", windowKeyUp);
};

onMounted(() => {
  installKeyboardHandler();
});

function setGlobalMode(index: number) {
  document.dispatchEvent(
    new CustomEvent<number>("setGlobalMode", {
      detail: index,
      bubbles: true,
      cancelable: true,
    })
  );
}
</script>

<template>
  <div class="mainmenu flex p-1 w-full">
    <div class="flex-row w-full">
      <div class="flex" style="margin: 0.4%">
        <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
      </div>
      <div class="grid m-0 w-full">
        <div v-for="n in 10" class="col10">
          <Button @click="ButtonClick(n - 1)" class="w-full h-full">
            <div v-html="ButtonLabel(n - 1)"></div>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col10 {
  height: 7em;
  width: 9.2%;
  margin: 0.4%;
}
.mainmenu {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>

<style>
.mainmenu-label {
  font-size: 125%;
  position: absolute;
  text-align: left;
  left: 0;
  bottom: 0;
  padding: 0.5em;
}

.mainmenu-function {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}

.mainmenu-submenu {
  position: absolute;
  top: 0.75em;
  left: 0.5em;
}

.mainmenu-onoff {
  position: absolute;
  top: 0.75em;
  left: 0.5em;
}
</style>
