<script setup lang="ts">
import { ref } from "vue";

const jogSpeedForMode: Array<number> = [50, 50];

const jogSpeed = ref(50);
const jogModeOptions = ref([
  { label: "<div style='font-size:2em'>🐢</div>", value: "Slow" },
  { label: "<div style='font-size:2em'>🐇</div>", value: "Fast" },
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

const windowKeyDown = (event: any) => {
  console.log(event);
  if (
    event.key.startsWith("Arrow") ||
    event.key.startsWith("Page") ||
    event.key == " " ||
    event.key == "Insert" ||
    event.key == "Delete" ||
    event.key == "Home" ||
    event.key == "End" ||
    event.key == "[" ||
    event.key == "]"
  ) {
    switch (event.key) {
      case "ArrowLeft":
        break;
      case "ArrowRight":
        break;
      case "ArrowDown":
        break;
      case "ArrowUp":
        break;
      case "PageDown":
        break;
      case "PageUp":
        break;
      case "Insert":
        jogSpeed.value = Math.max(1, jogSpeed.value - 1);
        jogSpeedSync();
        break;
      case "Home":
        jogSpeed.value = Math.min(100, jogSpeed.value + 1);
        jogSpeedSync();
        break;
      case "Delete":
      case "[":
        jogSpeed.value = Math.max(
          1,
          jogSpeed.value - (jogSpeed.value % 10) - 10
        );
        jogSpeedSync();
        break;
      case "End":
      case "]":
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
    event.preventDefault();
  }
};

const windowKeyUp = (event: any) => {
  if (
    event.key.startsWith("Arrow") ||
    event.key.startsWith("Page") ||
    event.key == " " ||
    event.key == "Insert" ||
    event.key == "Delete" ||
    event.key == "Home" ||
    event.key == "End" ||
    event.key == "[" ||
    event.key == "]"
  ) {
    switch (event.key) {
      case "ArrowLeft":
        break;
      case "ArrowRight":
        break;
      case "ArrowDown":
        break;
      case "ArrowUp":
        break;
      case "PageDown":
        break;
      case "PageUp":
        break;
      case "[":
        break;
      case "]":
        break;
      case " ":
        break;
    }
    event.preventDefault();
  }
};

const installKeyboardHandler = () => {
  console.log("installKeyboardHandler");
  document.addEventListener("keydown", windowKeyDown);
  document.addEventListener("keyup", windowKeyUp);
};

const removeKeyboardHandler = () => {
  console.log("removeKeyboardHandler");
  document.removeEventListener("keydown", windowKeyDown);
  document.removeEventListener("keyup", windowKeyUp);
};

defineExpose({
  installKeyboardHandler,
  removeKeyboardHandler,
});
</script>

<template>
  <div class="flex h-full prevent-select p-3">
    <div class="grid w-full">
      <div class="col-3"></div>
      <div class="col-3">
        <Button label="Y-" class="w-full h-full"></Button>
      </div>
      <div class="col-3"></div>
      <div class="col-3">
        <Button label="Z+" class="w-full h-full"></Button>
      </div>
      <div class="col-3">
        <Button label="X-" class="w-full h-full"></Button>
      </div>
      <div class="col-3"></div>
      <div class="col-3">
        <Button label="X+" class="w-full h-full"></Button>
      </div>
      <div class="col-3">
        <Button label="Z-" class="w-full h-full"></Button>
      </div>
      <div class="col-3"></div>
      <div class="col-3">
        <Button label="Y+" class="w-full h-full"></Button>
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
            :disabled="jogSpeed <= 5"
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
