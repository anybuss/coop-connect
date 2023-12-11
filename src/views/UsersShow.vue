<script lang="ts" setup>
import UserForm from "@/components/users/UserForm.vue";
import { useUsersStore } from "@/store/users";
import {
  prettifyCurrency,
  prettifyDate,
  prettifyPhoneNumber,
  prettifyTaxId,
} from "@/utils/prettifys";
import { ref } from "vue";

type UserModel = {
  id: string;
  userType: "person" | "entity";
  fullName: string;
  phone: string;
  taxId: string;
  birthdateOrFoundationDate: string;
  incomeOrRevenue: string;
};

const store = useUsersStore();
const { users, editUser, deleteUser } = store;

const showEditModal = ref(false);
const selectedUser = ref<UserModel | null>(null);

const openEditUserForm = (user: UserModel) => {
  selectedUser.value = user;
  showEditModal.value = true;
};

const headers: any = [
  { title: "Nome", value: "fullName", sortable: true, align: "left" },
  {
    title: "Tipo de Cadastro",
    value: "userType",
    sortable: true,
    align: "left",
  },
  { title: "Documento", value: "taxId", sortable: true, align: "left" },
  { title: "Telefone", value: "phone", sortable: true, align: "left" },
  {
    title: "Data de Nascimento/Constituição",
    value: "birthdateOrFoundationDate",
    sortable: true,
    align: "left",
  },
  {
    title: "Renda/Faturamento",
    value: "incomeOrRevenue",
    sortable: true,
    align: "right",
  },
  { title: "Ações", value: "id", sortable: false, align: "left" },
];

const message = ref<string>("");
const colorType = ref<string>("");
const showSnackbar = ref<boolean>(false);
const handleSubmitEdit = (formModel: any) => {
  try {
    editUser(formModel.id, formModel);
    message.value = "Usuário editado com sucesso!";
    colorType.value = "success";
  } catch (error: any) {
    message.value = "Erro ao editar usuário!";
    colorType.value = "error";
    console.error(error.message);
  } finally {
    showSnackbar.value = true;
    showEditModal.value = false;
  }
};

const handleDeleteUser = (id: string) => {
  try {
    deleteUser(id);
    message.value = "Usuário deletado com sucesso!";
    colorType.value = "success";
  } catch (error: any) {
    message.value = "Erro ao deletar usuário!";
    colorType.value = "error";
    console.error(error.message);
  } finally {
    showSnackbar.value = true;
  }
};
</script>

<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4">Visualização de Cooperado</h1>
          <p class="text-subtitle-1">
            Você pode visualizar, editar e deletar cooperados na tabela abaixo.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-card flat>
        <v-card-title>
          <v-icon icon="mdi-account-group"> </v-icon>
        </v-card-title>
      </v-card>

      <v-divider></v-divider>
      <v-data-table
        :items="users"
        :headers="headers"
        itemsPerPageText="Itens por página"
      >
        <template #item.userType="{ item }">
          <span v-if="item.userType === 'person'">Pessoa Física</span>
          <span v-else>Pessoa Jurídica</span>
        </template>

        <template #item.phone="{ item }">
          {{ prettifyPhoneNumber(item.phone) }}
        </template>

        <template #item.taxId="{ item }">
          {{ prettifyTaxId(item.taxId) }}
        </template>

        <template #item.birthdateOrFoundationDate="{ item }">
          {{ prettifyDate(item.birthdateOrFoundationDate) }}
        </template>

        <template #item.incomeOrRevenue="{ item }">
          <div class="text-right">
            {{ prettifyCurrency(item.incomeOrRevenue) }}
          </div>
        </template>

        <template #item.id="{ item }">
          <v-row class="d-flex flex-nowrap">
            <v-btn
              size="x-small"
              icon="mdi-pencil"
              color="primary"
              variant="tonal"
              class="mr-2"
              @click="openEditUserForm(item)"
            ></v-btn>
            <v-btn
              size="x-small"
              icon="mdi-delete"
              color="error"
              variant="tonal"
              @click="handleDeleteUser(item.id)"
            ></v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-container>

    <v-dialog v-model="showEditModal" width="800">
      <v-card>
        <v-container>
          <h1 class="text-h4">Editar Cooperado</h1>
          <p class="text-subtitle-1">O campo CPF/CNPJ não pode ser alterado.</p>
        </v-container>

        <v-container>
          <UserForm :user="selectedUser" @submit-edit="handleSubmitEdit" />
        </v-container>
        <v-snackbar
          close-on-content-click
          :timeout="1500"
          :color="colorType"
          v-model="showSnackbar"
        >
          {{ message }}
        </v-snackbar>
      </v-card>
    </v-dialog>
  </v-container>
</template>
