<script lang="ts" setup>
import UserForm from "@/components/users/UserForm.vue";
import { useUsersStore } from "@/store/users";
import { ref } from "vue";

const usersStore = useUsersStore();

const message = ref<string>("");
const colorType = ref<string>("");
const showSnackbar = ref<boolean>(false);

const handleSubmitForm = (formModel: any) => {
  try {
    usersStore.addUser(formModel);
    message.value = "Usuário cadastrado com sucesso!";
    colorType.value = "success";
    showSnackbar.value = true;
  } catch (error: any) {
    message.value = "Erro ao cadastrar usuário! (Usuário já cadastrado)";
    colorType.value = "error";
    showSnackbar.value = true;
    console.error(error.message);
  }
};
</script>

<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4">Cadastro de Cooperado</h1>
          <p class="text-subtitle-1">
            Para cadastrar preencha o formulário abaixo.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <UserForm @submit-form="handleSubmitForm" />

      <v-snackbar
        close-on-content-click
        :timeout="1500"
        :color="colorType"
        v-model="showSnackbar"
      >
        {{ message }}
      </v-snackbar>
    </v-container>
  </v-container>
</template>
