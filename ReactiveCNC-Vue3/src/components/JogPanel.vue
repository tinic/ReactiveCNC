<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["jog"]);

export interface Props {
  disabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const jogState: Array<boolean> = [];
const jogSpeedForMode: Array<number> = [50, 50];

const jogSpeed = ref(50);
const jogModeOptions = ref([
  { label: "<div style='font-size:1.75em'>🐢</div>", value: "Slow" },
  { label: "<div style='font-size:1.75em'>🐇</div>", value: "Fast" },
]);
const jogMode = ref(jogModeOptions.value[0]);
function jogModeSync() {
  if (jogMode.value == jogModeOptions.value[0]) {
    jogSpeed.value = jogSpeedForMode[0];
  } else if (jogMode.value == jogModeOptions.value[1]) {
    jogSpeed.value = jogSpeedForMode[1];
  }
}
const jogModeChanged = () => {
  if (jogMode.value == null) {
    jogMode.value = jogModeOptions.value[0];
  }
  jogModeSync();
};
function jogSpeedSync() {
  if (jogMode.value == jogModeOptions.value[0]) {
    jogSpeedForMode[0] = jogSpeed.value;
  } else if (jogMode.value == jogModeOptions.value[1]) {
    jogSpeedForMode[1] = jogSpeed.value;
  }
}
const jogSpeedChanged = () => {
  if (jogSpeed.value < 1) {
    jogSpeed.value = 1;
  }
  jogSpeedSync();
};
const jogSpeedEmitStr = () => {
  if (jogMode.value == jogModeOptions.value[0]) {
    return jogSpeedForMode[0] / 100;
  } else if (jogMode.value == jogModeOptions.value[1]) {
    return jogSpeedForMode[1] / 100;
  }
};
const jogModeEmitStr = () => {
  if (jogMode.value == jogModeOptions.value[0]) {
    return "slow";
  } else if (jogMode.value == jogModeOptions.value[1]) {
    return "fast";
  }
};

const windowKeyDown = (event: any) => {
  if (
    event.key.startsWith("Arrow") ||
    event.key.startsWith("Page") ||
    event.key == " " ||
    event.key == "w" ||
    event.key == "a" ||
    event.key == "s" ||
    event.key == "d" ||
    event.key == "r" ||
    event.key == "f" ||
    event.key == "Insert" ||
    event.key == "Delete" ||
    event.key == "Home" ||
    event.key == "End" ||
    event.key == "-" ||
    event.key == "=" ||
    event.key == "[" ||
    event.key == "]"
  ) {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        if (!jogState[0]) {
          jogState[0] = true;
          emit("jog", "x-", jogModeEmitStr(), jogSpeedEmitStr(), "start");
        }
        break;
      case "d":
      case "ArrowRight":
        if (!jogState[1]) {
          jogState[1] = true;
          emit("jog", "x+", jogModeEmitStr(), jogSpeedEmitStr(), "start");
        }
        break;
      case "s":
      case "ArrowDown":
        if (!jogState[2]) {
          jogState[2] = true;
          emit("jog", "y+", jogModeEmitStr(), jogSpeedEmitStr(), "start");
        }
        break;
      case "w":
      case "ArrowUp":
        if (!jogState[3]) {
          jogState[3] = true;
          emit("jog", "x-", jogModeEmitStr(), jogSpeedEmitStr(), "start");
        }
        break;
      case "f":
      case "PageDown":
        if (!jogState[4]) {
          jogState[4] = true;
          emit("jog", "z-", jogModeEmitStr(), jogSpeedEmitStr(), "start");
        }
        break;
      case "r":
      case "PageUp":
        if (!jogState[5]) {
          jogState[5] = true;
          emit("jog", "z+", jogModeEmitStr(), jogSpeedEmitStr(), "start");
        }
        break;
      case "[":
      case "Insert":
        jogSpeed.value = Math.max(1, jogSpeed.value - 1);
        jogSpeedSync();
        break;
      case "]":
      case "Home":
        jogSpeed.value = Math.min(100, jogSpeed.value + 1);
        jogSpeedSync();
        break;
      case "-":
      case "Delete":
        jogSpeed.value = Math.max(
          1,
          jogSpeed.value - (jogSpeed.value % 10) - 10
        );
        jogSpeedSync();
        break;
      case "=":
      case "End":
        jogSpeed.value = Math.min(
          100,
          jogSpeed.value - (jogSpeed.value % 10) + 10
        );
        jogSpeedSync();
        break;
      case " ":
        if (jogMode.value == jogModeOptions.value[0]) {
          jogMode.value = jogModeOptions.value[1];
        } else {
          jogMode.value = jogModeOptions.value[0];
        }
        jogModeSync();
        break;
    }
    event.stopPropagation();
  }
};

const windowKeyUp = (event: any) => {
  if (
    event.key.startsWith("Arrow") ||
    event.key.startsWith("Page") ||
    event.key == " " ||
    event.key == "w" ||
    event.key == "a" ||
    event.key == "s" ||
    event.key == "d" ||
    event.key == "r" ||
    event.key == "f" ||
    event.key == "Insert" ||
    event.key == "Delete" ||
    event.key == "Home" ||
    event.key == "End" ||
    event.key == "-" ||
    event.key == "=" ||
    event.key == "[" ||
    event.key == "]"
  ) {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        if (jogState[0]) {
          jogState[0] = false;
          emit("jog", "x-", jogModeEmitStr(), jogSpeedEmitStr(), "stop");
        }
        break;
      case "d":
      case "ArrowRight":
        if (jogState[1]) {
          jogState[1] = false;
          emit("jog", "x+", jogModeEmitStr(), jogSpeedEmitStr(), "stop");
        }
        break;
      case "s":
      case "ArrowDown":
        if (jogState[2]) {
          jogState[2] = false;
          emit("jog", "y+", jogModeEmitStr(), jogSpeedEmitStr(), "stop");
        }
        break;
      case "w":
      case "ArrowUp":
        if (jogState[3]) {
          jogState[3] = false;
          emit("jog", "x-", jogModeEmitStr(), jogSpeedEmitStr(), "stop");
        }
        break;
      case "f":
      case "PageDown":
        if (jogState[4]) {
          jogState[4] = false;
          emit("jog", "z-", jogModeEmitStr(), jogSpeedEmitStr(), "stop");
        }
        break;
      case "r":
      case "PageUp":
        if (jogState[5]) {
          jogState[5] = false;
          emit("jog", "z+", jogModeEmitStr(), jogSpeedEmitStr(), "stop");
        }
        break;
    }
    event.stopPropagation();
  }
};

const installKeyboardHandler = () => {
  (Element.prototype as any).shadowKeyEvents = true;
  document.addEventListener("keydown", windowKeyDown);
  document.addEventListener("keyup", windowKeyUp);
};

const removeKeyboardHandler = () => {
  (Element.prototype as any).shadowKeyEvents = false;
  document.removeEventListener("keydown", windowKeyDown);
  document.removeEventListener("keyup", windowKeyUp);
};

const mouseDown = (axis: string) => {
  emit("jog", axis, jogModeEmitStr(), jogSpeedEmitStr(), "start");
};

const mouseUp = (axis: string) => {
  emit("jog", axis, jogModeEmitStr(), jogSpeedEmitStr(), "stop");
};

defineExpose({
  installKeyboardHandler,
  removeKeyboardHandler,
});
</script>

<template>
  <div :class="{ disabled: props.disabled }">
    <div class="flex h-full prevent-select p-3">
      <div class="grid w-full">
        <div class="col-3"></div>
        <div class="col-3">
          <Button
            label="Y-"
            class="w-full h-full"
            @mousedown="mouseDown('y-')"
            @mouseup="mouseUp('y-')"
          ></Button>
        </div>
        <div class="col-3"></div>
        <div class="col-3">
          <Button
            label="Z+"
            class="w-full h-full"
            @mousedown="mouseDown('z+')"
            @mouseup="mouseUp('z+')"
          ></Button>
        </div>
        <div class="col-3">
          <Button
            label="X-"
            class="w-full h-full"
            @mousedown="mouseDown('x-')"
            @mouseup="mouseUp('x-')"
          ></Button>
        </div>
        <div class="col-3"></div>
        <div class="col-3">
          <Button
            label="X+"
            class="w-full h-full"
            @mousedown="mouseDown('x+')"
            @mouseup="mouseUp('x+')"
          ></Button>
        </div>
        <div class="col-3">
          <Button
            label="Z-"
            class="w-full h-full"
            @mousedown="mouseDown('z-')"
            @mouseup="mouseUp('z-')"
          ></Button>
        </div>
        <div class="col-3"></div>
        <div class="col-3">
          <Button
            label="Y+"
            class="w-full h-full"
            @mousedown="mouseDown('y+')"
            @mouseup="mouseUp('y+')"
          ></Button>
        </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
      </div>
      <div class="flex ml-5">
        <div>
          <SelectButton
            v-model="jogMode"
            @update:modelValue="jogModeChanged"
            :options="jogModeOptions"
            optionLabel="label"
            dataKey="value"
            aria-labelledby="custom"
          >
            <template #option="slotProps: any">
              <div v-html="slotProps.option.label"></div>
            </template>
          </SelectButton>
          <Knob
            v-model="jogSpeed"
            @update:modelValue="jogSpeedChanged"
            :step="1"
            valueTemplate="{value}%"
            :min="0"
            :max="100"
            :size="150"
            class="mt-2"
          ></Knob>
          <div class="flex">
            <Button
              label="-"
              class="w-full mr-1 pt-2 pb-2"
              @click="
                jogSpeed = Math.max(1, jogSpeed - (jogSpeed % 10) - 10);
                jogSpeedSync();
              "
              :disabled="jogSpeed <= 1"
            ></Button>
            <Button
              label="+"
              class="w-full ml-1 pt-2 pb-2"
              @click="
                jogSpeed = Math.min(100, jogSpeed - (jogSpeed % 10) + 10);
                jogSpeedSync();
              "
              :disabled="jogSpeed >= 100"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-button {
  font-family: "iosevka";
  font-weight: bold;
  font-size: 3em;
  text-align: center;
  margin: 0;
  padding: 0;
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
