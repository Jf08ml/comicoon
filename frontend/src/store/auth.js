import { defineStore } from "pinia";
import Cookies from "js-cookie";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("accessToken") || null,
    refreshTokenUser: Cookies.get("refreshToken") || null,
    userRolName: "",
    userImgProfile: "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async logout() {
      this.token = null;
      this.refreshToken = null;
      Cookies.remove("accessToken", { sameSite: "strict" });
      Cookies.remove("refreshToken", { sameSite: "strict" });
      router.push("/");
    },
  },
});
