<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToNewUser = () => {
  router.push({ name: "users-new" });
};

const goToShowUsers = () => {
  router.push({ name: "users-show" });
};
</script>

<template>
  <v-main class="d-flex align-center justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="text-h4">Conecte-se, Colabore e Cresça conosco!</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn color="primary" @click="goToNewUser"> Novo Cooperado </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" variant="outlined" @click="goToShowUsers">
            Visualizar Cooperados
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
