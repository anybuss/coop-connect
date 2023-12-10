import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref, type Ref } from "vue";

type UserType = "person" | "entity";
type UserModel = {
  id: string;
  userType: UserType;
  fullName: string;
  phone: string;
  taxId: string;
  birthdateOrFoundationDate: string;
  incomeOrRevenue: string;
};
export const useUsersStore = defineStore("users", () => {
  //
});
