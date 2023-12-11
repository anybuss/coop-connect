<script lang="ts" setup>
import UserForm from "@/components/users/UserForm.vue";
import { useUsersStore } from "@/store/users";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsersStore();

const message = ref<string>("");
const colorType = ref<string>("");
const showSnackbar = ref<boolean>(false);

const handleSubmitForm = (formModel: any) => {
  try {
    usersStore.addUser(formModel);
    setTimeout(() => {
      router.push({ name: "users-show" });
    }, 2000);
    message.value = "Usuário cadastrado com sucesso! Você será redirecionado.";
    colorType.value = "success";
  } catch (error: any) {
    message.value = "Erro ao cadastrar usuário! (Usuário já cadastrado)";
    colorType.value = "error";
    console.error(error.message);
  } finally {
    showSnackbar.value = true;
  }
};
</script>

<template>
  <v-container class="w-75">
    <v-container>
      <h1 class="text-h4">Cadastro de Cooperado</h1>
      <p class="text-subtitle-3">
        Para cadastrar preencha o formulário abaixo.
      </p>
    </v-container>

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
</template>
