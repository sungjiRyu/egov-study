import { defineStore } from "pinia";
import { signInRequest, signOutRequeset, signUpRequest } from "@/api/apis";

export const useUserStore = defineStore("user", {
  state: () => ({
    loginUserInfo: JSON.parse(localStorage.getItem('loginUserInfo')) || null,
    jToken: localStorage.getItem('jToken') || null,    
  }),

  actions: {
    async signIn(requestBody) {
      try {
        const response = await signInRequest(requestBody);
        const code = response.data.resultCode;
        if(code === 200) {                    
          this.loginUserInfo = response.data.resultVO          
          this.jToken = response.data.jToken          
          // save token && userId in sessionStorage
          localStorage.setItem('loginUserInfo', JSON.stringify(response.data.resultVO));
          localStorage.setItem('jToken', response.data.jToken);
        }
        return code;
      } catch(error) {
        console.log('server error : '+ error);
      }
    },

    async signOut() {
      try {
        const response = await signOutRequeset();
        const code = response.data.resultCode;
        if(code === 200) {
          this.loginUserInfo = null
          this.jToken = null
          // remove token && userId in localStorage
          localStorage.removeItem('loginUserInfo');
          localStorage.removeItem('jToken');
        }
        return code;
      } catch(error) {
        console.log('server error : '+ error);
      }
    },
  }
})

