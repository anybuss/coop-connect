<script lang="ts" setup>
import { useNotification } from "@/composables/useNotification";
import {
  birthdateOrFoundationDateValidator,
  requiredFieldValidator,
  taxIdValidator,
} from "@/utils/validators";
import { computed, nextTick, ref, watch, type Ref } from "vue";
import AppNotification from "../AppNotification.vue";
import { UserCreationType, UserEntity } from "@/types/users";

interface Props {
  user?: UserEntity | null;
}

const { showMessage, message, colorType, showNotification } = useNotification();

const props = withDefaults(defineProps<Props>(), {
  user: null,
});

const emits = defineEmits(["submit-form", "submit-edit"]);

const isUserEdit = computed(() => {
  return !!props.user;
});

const formRef = ref<any>(null);
const formModel: Ref<UserCreationType> = ref({
  userType: "person",
  fullName: "",
  phone: "",
  taxId: "",
  birthdateOrFoundationDate: "",
  incomeOrRevenue: "",
});

const userType = computed(() => formModel.value.userType);

const taxIdLabel = computed(() => {
  return userType.value === "person" ? "CPF" : "CNPJ";
});

const taxIdCounter = computed(() => {
  return userType.value === "person" ? 11 : 14;
});

const taxIdHint = computed(() => {
  return userType.value === "person"
    ? "Exemplo: 99999999999"
    : "Exemplo: 99999999999999";
});

const birthdateOrFoundationDateLabel = computed(() => {
  return userType.value === "person"
    ? "Data de Nascimento"
    : "Data de Fundação";
});

const incomeOrRevenueLabel = computed(() => {
  return userType.value === "person" ? "Renda" : "Faturamento";
});

const fullNameRules = [
  (value: string) => requiredFieldValidator(value, "O nome é obrigatório"),
];

const taxIdRules = computed(() => [
  (value: string) => taxIdValidator(value, formModel.value.userType),
]);

const birthdateOrFoundationDateRules = computed(() => [
  (value: string) =>
    birthdateOrFoundationDateValidator(value, formModel.value.userType),
]);

const emitSubmitForm = async () => {
  const { valid } = await formRef.value?.validate();
  if (valid) {
    if (isUserEdit.value) {
      emits("submit-edit", { ...formModel.value, id: props.user!.id });
    } else {
      emits("submit-form", formModel.value);
    }

    formModel.value = {
      userType: formModel.value.userType,
      fullName: "",
      phone: "",
      taxId: "",
      birthdateOrFoundationDate: "",
      incomeOrRevenue: "",
    };

    await nextTick();
    formRef.value.resetValidation();
  } else {
    showMessage("Formulário inválido!", "error");
  }
};

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formModel.value = { ...newUser };
    }
  },
  { immediate: true }
);

watch(
  () => formModel.value.userType,
  () => {
    formModel.value = {
      ...formModel.value,
      taxId: "",
      birthdateOrFoundationDate: "",
      incomeOrRevenue: "",
    };

    if (formRef.value) {
      formRef.value.resetValidation();
    }
  }
);
</script>

<template>
  <v-container fluid>
    <v-form ref="formRef" @submit.prevent>
      <template v-if="!isUserEdit">
        <v-row>
          <v-col>
            <v-radio-group v-model="formModel.userType" row inline>
              <v-radio
                label="Cadastro de Pessoa Física"
                value="person"
                class="mr-6"
              ></v-radio>
              <v-radio
                label="Cadastro de Pessoa Jurídica"
                value="entity"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </template>

      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            v-model="formModel.fullName"
            :rules="fullNameRules"
            label="Nome"
            type="text"
            prepend-icon="mdi-account"
            required
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="formModel.phone"
            label="Telefone"
            type="tel"
            prepend-icon="mdi-phone"
            clearable
            :counter="11"
            hint="Exemplo: XX123456789"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="formModel.taxId"
            :rules="taxIdRules"
            :label="taxIdLabel"
            type="text"
            prepend-icon="mdi-card-account-details"
            :counter="taxIdCounter"
            :hint="taxIdHint"
            required
            clearable
            :disabled="isUserEdit"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="formModel.birthdateOrFoundationDate"
            :rules="birthdateOrFoundationDateRules"
            :label="birthdateOrFoundationDateLabel"
            type="date"
            prepend-icon="mdi-calendar"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="formModel.incomeOrRevenue"
            :label="incomeOrRevenueLabel"
            type="number"
            prepend-icon="mdi-cash-multiple"
            prefix="R$"
            hide-spin-buttons
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn color="primary" block @click="emitSubmitForm">
            {{ isUserEdit ? "Atualizar" : "Salvar" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <AppNotification
      :show="showNotification"
      :message="message"
      :color="colorType"
    />
  </v-container>
</template>
