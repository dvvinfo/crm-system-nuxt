import { defineStore } from "pinia";

interface InAuthStore {
  email: string;
  name: string;
  status: boolean;
}

const defaultValue: { user: InAuthStore } = {
  user: {
    email: "",
    name: "",
    status: false,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  getters: {
    isAuth: (state) => state.user.status,
  },
  actions: {
    clear() {
			this.$patch(defaultValue)
		},
    set(input: InAuthStore) {
      this.$patch({ user: input });
    },
  },
});
