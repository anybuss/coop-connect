export function prettifyPhoneNumber(phone: string | null): string {
  if (!phone || phone.length !== 11) {
    return phone || "";
  }

  const part1 = phone.slice(0, 2);
  const part2 = phone.slice(2, 7);
  const part3 = phone.slice(7, 11);

  return `(${part1}) ${part2}-${part3}`;
}

export function prettifyTaxId(taxId: string | null): string {
  if (!taxId) {
    return "";
  }

  if (taxId.length === 11) {
    return taxId.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (taxId.length === 14) {
    return taxId.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return taxId;
}

export function prettifyDate(dateStr: string): string {
  const parts = dateStr.split("-");

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function prettifyCurrency(value: number | string | null): string {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    value = Number(value);
  }

  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
}
