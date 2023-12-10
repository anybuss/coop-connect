<script lang="ts" setup>
import type { RouteRecordName } from "vue-router";

interface Props {
  activeRoute: RouteRecordName | null | undefined;
}

const props = defineProps<Props>();
const emits = defineEmits(["navigate"]);

const isLinkActive = (routeName: string) => {
  return props.activeRoute === routeName;
};

const emitNavigate = (routeName: string) => {
  emits("navigate", routeName);
};
</script>

<template>
  <v-list density="comfortable" lines="one" nav>
    <v-list-subheader>Menu de navegação</v-list-subheader>

    <v-list-item
      prepend-icon="mdi-home"
      :active="isLinkActive('home')"
      @click="emitNavigate('home')"
    >
      Página inicial
    </v-list-item>

    <v-list-group value="users">
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-account"
          title="Cooperados"
        ></v-list-item>
      </template>

      <v-list-item
        prepend-icon="mdi-account-plus"
        :active="isLinkActive('users-new')"
        @click="emitNavigate('users-new')"
      >
        Novo
      </v-list-item>

      <v-list-item
        prepend-icon="mdi-account-group"
        :active="isLinkActive('users-show')"
        @click="emitNavigate('users-show')"
      >
        Visualizar
      </v-list-item>
    </v-list-group>
  </v-list>
</template>
