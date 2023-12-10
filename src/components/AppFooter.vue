<script lang="ts" setup>
import { ref } from "vue";

const currentYear = ref<number>(new Date().getFullYear());
</script>

<template>
  <v-footer fixed elevation="2">
    <v-container>
      <v-row justify="center">
        <v-col class="text-center">
          Coop Connect, {{ currentYear }} | Desenvolvido por
          <a href="https://github.com/anybuss" target="_blank">
            Any Buss
            <v-icon icon="mdi-heart"></v-icon>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
a {
  color: inherit;
}
</style>
