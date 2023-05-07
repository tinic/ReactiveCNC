<script setup lang="ts">
import { ref, onMounted } from "vue";

const mainMenuStack = ref(Array<number>());

const mainMenu = ref([
  {
    index: 0,
    bread: "G-code",
    label: () => {
      return "<div class='mainmenu-label'>G-code</div>";
    },
    fnkey: ["F1"],
    ffunc: () => {
      mainMenuStack.value.push(0);
    },
    smenu: [
      {
        index: 0,
        bread: "Load",
        label: () => {
          return "<span class='mainmenu-label'>Load</span>";
        },
        fnkey: ["F1"],
        ffunc: () => {},
      },
      {
        index: 1,
        bread: "Run",
        label: () => {
          return "<span class='mainmenu-label'>Run</span>";
        },
        fnkey: ["F2"],
        ffunc: () => {},
      },
      {
        index: 2,
        bread: "Pause",
        label: () => {
          return "<span class='mainmenu-label'>Pause</span>";
        },
        fnkey: ["F3"],
        ffunc: () => {},
      },
      {
        index: 3,
        bread: "To Zero",
        label: () => {
          return "<span class='mainmenu-label'>To Zero</span>" 
        },
        fnkey: ["F4"],
        ffunc: () => {},
      },
      {
        index: 9,
        bread: "Back",
        label: () => {
          return "<span class='mainmenu-label'>Back</span>" 
        },
        fnkey: ["ESC", "F8"],
        ffunc: () => {
          mainMenuStack.value.pop();
        },
      },
    ],
  },
  {
    index: 1,
    bread: "MDI",
    label: () => {
      return "<span class='mainmenu-label'>MDI</span>" 
    },
    fnkey: ["F2"],
    ffunc: () => {
      mainMenuStack.value.push(1);
    },
    smenu: [
      {
        index: 0,
        bread: "Run",
        label: () => {
          return "<span class='mainmenu-label'>Run</span>" 
        },
        fnkey: ["F1"],
        ffunc: () => {},
      },
      {
        index: 1,
        bread: "Clear History",
        label: () => {
          return "<span class='mainmenu-label'>Clear History</span>" 
        },
        fnkey: ["F2"],
        ffunc: () => {},
      },
      {
        index: 9,
        bread: "Back",
        label: () => {
          return "<span class='mainmenu-label'>Back</span>" 
        },
        fnkey: ["ESC", "F8"],
        ffunc: () => {
          mainMenuStack.value.pop();
        },
      },
    ],
  },
  {
    index: 2,
    bread: "JOG",
    label: () => {
      return "<span class='mainmenu-label'>JOG</span>" 
    },
    fnkey: ["F3"],
    ffunc: () => {
    }
  },
  {
    index: 3,
    bread: "Tooltable",
    label: () => {
      return "<span class='mainmenu-label'>Tool table</span>" 
    },
    fnkey: ["F4"],
    ffunc: () => {
    }
  },
  {
    index: 8,
    bread: "Quit",
    label: () => {
      return "<span class='mainmenu-label'>Quit</span>" 
    },
    fnkey: ["F7"],
    ffunc: () => {
    }
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
  var fstr = "<span class='mainmenu-function'>";
  foundItem.fnkey.forEach((fkey: any) => {
    fstr += fkey + "/";
  });
  fstr = fstr.substring(0, fstr.length - 1);
  fstr += "</span>";
  return fstr + foundItem.label();
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

const home = ref({
    icon: 'pi pi-home',
    to: '/',
});
const items = ref([
    {label: 'Computer'},
    {label: 'Notebook'},
    {label: 'Accessories'},
    {label: 'Backpacks'},
    {label: 'Item'}
]);


</script>

<template>
  <div class="mainmenu flex p-1 w-full">
    <div class="flex-row w-full">
      <div class="flex" style="margin:0.4%">
        <Breadcrumb :home="home" :model="items" />
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
</style>
