import { defineStore } from "pinia";
import { signInRequest, signOutRequeset, signUpRequest } from "@/api/apis";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    isLogIn: false,
    jToken: null,
  }),

  actions: {
    async signIn(requestBody) {
      try {
        const response = await signInRequest(requestBody);
        const code = response.data.resultCode;
        if (response && code === "200") {
          this.jToken = response.data.jToken;
          this.id = response.data.resultVO.id;
          this.isLogIn = true;
          // save token in sessionStorage
          localStorage.setItem("jToken", this.jToken);
          localStorage.setItem("loginUser", this.id);
        }
      } catch (error) {
        console.log("err : " + error);
      }
    },

    async signOut() {
      try {
        const response = await signOutRequeset();
        const code = response.data.resultCode;
        if (response && code === 200) {
          this.isLogIn = false;
          this.jToken = null;
          // remove token in localStorage
          localStorage.removeItem("jToken");
          localStorage.removeItem("loginUser");
        }
      } catch (error) {
        console.log("err : " + error);
      }
    },
  },
});
