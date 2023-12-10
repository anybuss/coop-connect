<script lang="ts" setup>
import { ref } from "vue";

const drawer = ref<boolean>(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary> </v-navigation-drawer>

  <v-app-bar flat class="border-b">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Coop Connect</v-app-bar-title>
    <v-img max-width="60" src="@/assets/logo.png" />
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>
</template>
