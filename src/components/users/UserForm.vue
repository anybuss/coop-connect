<script lang="ts" setup>
import {
  birthdateOrFoundationDateValidator,
  requiredFieldValidator,
  taxIdValidator,
} from "@/utils/validators";
import { computed, ref, type Ref, watch } from "vue";

interface Props {
  user?: UserModelType | null;
}

type FormModelType = {
  userType: "person" | "entity";
  fullName: string;
  phone: string;
  taxId: string;
  birthdateOrFoundationDate: string;
  incomeOrRevenue: string;
};

type UserModelType = FormModelType & {
  id: string;
};

const props = withDefaults(defineProps<Props>(), {
  user: null,
});

const emits = defineEmits(["submit-form", "submit-edit"]);

const isUserEdit = computed(() => {
  return !!props.user;
});

const formRef = ref<any>(null);
const formModel: Ref<FormModelType> = ref({
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

const message = ref<string>("");
const colorType = ref<string>("");
const showSnackbar = ref<boolean>(false);

const emitSubmitForm = async () => {
  const { valid } = await formRef.value?.validate();
  if (valid) {
    if (isUserEdit.value) {
      emits("submit-edit", { ...formModel.value, id: props.user!.id });
    } else {
      emits("submit-form", formModel.value);
    }
    formRef.value.reset();
  } else {
    colorType.value = "error";
    message.value = "Formulário inválido!";
    showSnackbar.value = true;
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

    <v-row>
      <v-col cols="12" mg="8" lg="6">
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
      <v-col cols="12" mg="8" lg="6">
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
      <v-col cols="12" mg="8" lg="6">
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
      <v-col cols="12" mg="8" lg="6">
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
      <v-col cols="12" mg="8" lg="6">
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
      <v-col cols="12" mg="8" lg="6">
        <v-btn color="primary" block @click="emitSubmitForm"> Salvar </v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-snackbar
    v-model="showSnackbar"
    close-on-content-click
    :timeout="1500"
    :color="colorType"
  >
    {{ message }}
  </v-snackbar>
</template>
