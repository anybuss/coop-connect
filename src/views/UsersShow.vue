<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUsersStore } from "@/store/users";
import {
  prettifyPhoneNumber,
  prettifyTaxId,
  prettifyDate,
  prettifyCurrency,
} from "@/utils/prettifys";
import UserForm from "@/components/users/UserForm.vue";

type UserModel = {
  id: string;
  userType: "person" | "entity";
  fullName: string;
  phone: string;
  taxId: string;
  birthdateOrFoundationDate: string;
  incomeOrRevenue: string;
};

const { users, editUser } = useUsersStore();

const showEditModal = ref(false);
const selectedUser = ref<UserModel | null>(null);

const openEditUserForm = (user: UserModel) => {
  selectedUser.value = user;
  showEditModal.value = true;
};

const headers = [
  { title: "Nome", value: "fullName", sortable: true },
  { title: "Tipo de Cadastro", value: "userType", sortable: true },
  { title: "Documento", value: "taxId", sortable: true },
  { title: "Telefone", value: "phone", sortable: true },
  {
    title: "Data de Nascimento/Constituição",
    value: "birthdateOrFoundationDate",
    sortable: true,
  },
  {
    title: "Renda/Faturamento",
    value: "incomeOrRevenue",
    sortable: true,
    align: "end",
  },
  { title: "Ações", value: "id", sortable: false },
];

const message = ref<string>("");
const colorType = ref<string>("");
const showSnackbar = ref<boolean>(false);
const handleSubmitEdit = (formModel: any) => {
  try {
    editUser(formModel.id, formModel);
    message.value = "Usuário editado com sucesso!";
    colorType.value = "success";
    showSnackbar.value = true;
    showEditModal.value = false;
  } catch (error: any) {
    message.value = "Erro ao editar usuário!";
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

          <v-snackbar
            close-on-content-click
            :timeout="1500"
            :color="colorType"
            v-model="showSnackbar"
          >
            {{ message }}
          </v-snackbar>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
