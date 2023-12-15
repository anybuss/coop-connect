<script lang="ts" setup>
import AppNotification from "@/components/AppNotification.vue";
import UserForm from "@/components/users/UserForm.vue";
import { useNotification } from "@/composables/useNotification";
import { useUsersStore } from "@/store/users";
import { UserCreationType } from "@/types/users";
import { useRouter } from "vue-router";

const router = useRouter();
const { addUser } = useUsersStore();
const { showMessage, message, colorType, showNotification } = useNotification();

const handleSubmitForm = async (formModel: UserCreationType) => {
  try {
    addUser(formModel);
    showMessage("Cooperado cadastrado com sucesso!", "success");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push({ name: "users-show" });
  } catch (error) {
    showMessage(
      "Erro ao cadastrar cooperado! (Cooperado já cadastrado)",
      "error"
    );
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
    <AppNotification
      :show="showNotification"
      :message="message"
      :color="colorType"
    />
  </v-container>
</template>
