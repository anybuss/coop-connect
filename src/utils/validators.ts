export function requiredFieldValidator(
  value: string,
  errorMessage: string
): boolean | string {
  return value.trim().length > 0 ? true : errorMessage;
}

export function taxIdValidator(
  value: string,
  userType: "person" | "entity"
): boolean | string {
  if (!value) {
    return userType === "person"
      ? "O CPF é obrigatório"
      : "O CNPJ é obrigatório";
  }
  if (userType === "person" && value.length !== 11) {
    return "O CPF deve ter 11 caracteres";
  }
  if (userType === "entity" && value.length !== 14) {
    return "O CNPJ deve ter 14 caracteres";
  }
  return true;
}

export function birthdateOrFoundationDateValidator(
  value: string,
  userType: "person" | "entity"
): boolean | string {
  return value
    ? true
    : userType === "person"
    ? "A data de nascimento é obrigatória"
    : "A data de constituição é obrigatória";
}
