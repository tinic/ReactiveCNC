<script setup lang="ts">
import { ref } from "vue";
const jogSpeed = ref(50);
const jogModeOptions = ref([
  { label: "<div style='font-size:2em'>🐢</div>", value: "Slow" },
  { label: "<div style='font-size:2em'>🐇</div>", value: "Fast" },
]);
const jogMode = ref(jogModeOptions.value[0]);
const updateJogSpeed = () => {
    if (jogSpeed.value < 1) {
        jogSpeed.value = 1;
    }
};
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
          @update:modelValue="updateJogSpeed"
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
            @click="jogSpeed = Math.max(1, (jogSpeed-(jogSpeed%10)) - 10)"
            :disabled="jogSpeed <= 5"
          ></Button>
          <Button
            label="+"
            class="w-full ml-1 pt-2 pb-2"
            @click="jogSpeed = Math.min(100, (jogSpeed-(jogSpeed%10)) + 10)"
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
