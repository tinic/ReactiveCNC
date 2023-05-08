<script setup lang="ts">
export interface Props {
  disabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});
</script>

<template>
  <div :class="{ disabled: props.disabled }">
    This panel is intentially left blank
  </div>
</template>
