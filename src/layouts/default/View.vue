<script lang="ts" setup>
import AppFooter from "@/components/AppFooter.vue";
import AppMenu from "@/components/AppMenu.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

type ComputedType = RouteRecordName | null | undefined;

const route = useRoute();
const activeRoute = computed<ComputedType>(() => {
  const invalidRouteName = route.name === null || route.name === undefined;
  if (invalidRouteName) return "home";
  return route.name;
});

const router = useRouter();
const handleNavigation = (routeName: string) => {
  router.push({ name: routeName });
};

const drawer = ref<boolean>(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" temporary>
      <AppMenu :active-route="activeRoute" @navigate="handleNavigation" />
    </v-navigation-drawer>

    <v-app-bar flat class="border-b">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Coop Connect</v-app-bar-title>
      <v-img max-width="60" src="@/assets/logo.png" />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>
