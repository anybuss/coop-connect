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
      throw new Error("Usuário já cadastrado.");
    }

    const userWithId = { ...newUser, id: uuidv4() };
    users.value.push(userWithId);
  };

  const editUser = (id: string, updatedData: Omit<UserModel, "id">) => {
    const userIndex = users.value.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("Usuário não encontrado.");
    }

    users.value[userIndex] = { ...users.value[userIndex], ...updatedData };
  };

  const deleteUser = (id: string) => {
    const userIndex = users.value.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error("Usuário não encontrado.");

    users.value.splice(userIndex, 1);
  };

  return { users, addUser, editUser, deleteUser };
});
