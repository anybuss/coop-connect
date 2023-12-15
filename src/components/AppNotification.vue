<script lang="ts" setup>
interface Props {
  show: boolean;
  message: string;
  color: string;
  timeout?: number;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  message: "",
  color: "",
  timeout: 3000,
});
</script>

<template>
  <v-snackbar
    :timeout="props.timeout"
    :color="props.color"
    v-model="props.show"
  >
    {{ props.message }}
  </v-snackbar>
</template>
