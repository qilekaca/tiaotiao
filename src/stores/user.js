import { defineStore } from "pinia";
import { login } from "@/service/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      _id: "",
      username: "",
      image: "",
      school: "",
      city: "",
    },
    token: "",
  }),

  persist: true,

  actions: {
    async login(username, password) {
      const res = await login({ user: { username, password } });
      console.log(res);
      this.user._id = res._id;
      this.user.username = res.username;
      this.user.image = res.image;
      this.user.school = res.school;
      this.user.city = res.city;
      this.token = `Bearer ${res.token}`;
    },
  },
});
