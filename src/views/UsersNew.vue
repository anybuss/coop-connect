<script lang="ts" setup>
import UserForm from "@/components/users/UserForm.vue";

// const handleSubmitForm(formModel: any){}
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
      <UserForm @submit-form="" />
    </v-container>
  </v-container>
</template>
