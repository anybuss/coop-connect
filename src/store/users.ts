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
  const users: Ref<UserModel[]> = ref([]);

  const addUser = (newUser: Omit<UserModel, "id">) => {
    const userExists = users.value.some((user) => user.taxId === newUser.taxId);
    if (userExists) {
      throw new Error("User already exists.");
    }

    const userWithId = { ...newUser, id: uuidv4() };
    users.value.push(userWithId);
  };

  return { users, addUser };
});
