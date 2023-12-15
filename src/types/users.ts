export type UserType = "person" | "entity";

export type UserEntity = {
  id: string;
  userType: UserType;
  fullName: string;
  phone: string;
  taxId: string;
  birthdateOrFoundationDate: string;
  incomeOrRevenue: string;
};

export type UserCreationType = Omit<UserEntity, "id">;
