<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUsersStore } from "@/store/users";
import {
  prettifyPhoneNumber,
  prettifyTaxId,
  prettifyDate,
  prettifyCurrency,
} from "@/utils/prettifys";

const { users } = useUsersStore();

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
  },
  { title: "Ações", value: "id", sortable: false },
];
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

        <template #item.id="{ item }"> </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
