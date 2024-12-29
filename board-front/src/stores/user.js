import { defineStore } from "pinia";
import axios from "axios";
import URL from "@/constants/url";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    isLogIn: false,
    errorMessage: "",
  }),

  getters: {},

  actions: {
    async signInRequest(requestBody) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/login-jwt",
          requestBody
        );

        if (response.data.resultCode === "200") {
          const userData = response.data.resultVO;
          this.id = userData.id;
          this.isLogIn = true;
          console.log("200" + this.isLogIn);
          this.errorMessage = "";
        } else {
          console.log("err" + this.isLogIn);
          this.isLogIn = false;
          this.errorMessage = response.data.resultMessage;
        }
      } catch (error) {
        this.isLogIn = false;
        alert("로그인 요청에 실패했습니다.");
      }
    },

    logOut() {
      this.id = null;
      this.isLogIn = false;
    },
  },
});
