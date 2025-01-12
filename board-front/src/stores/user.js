import { defineStore } from 'pinia'
import { api } from '@/boot/axios'
import { PATH } from '@/api/path'

export const useUserStore = defineStore('user', {
  state: () => ({
    loginUserInfo: JSON.parse(localStorage.getItem('loginUserInfo')) || null,
    jToken: localStorage.getItem('jToken') || null,
    isLogin: localStorage.getItem('loginUserInfo') ? true : false
  }),

  actions: {
    async signIn(requestBody) {
      return await api.post(PATH.LOGIN, requestBody).then((response) => {
        const statusCode = response.data.resultCode
        if (statusCode !== 200) return statusCode

        this.loginUserInfo = response.data.resultVO
        this.jToken = response.data.jToken
        this.isLogin = true
        localStorage.setItem('loginUserInfo', JSON.stringify(response.data.resultVO))
        localStorage.setItem('jToken', response.data.jToken)
        api.defaults.headers.common["Authorization"] = localStorage.getItem('jToken')
        return statusCode
      })
    },

    async signOut() {
      return await api.get(PATH.LOGOUT).then((response) => {
        api.defaults.headers.common["Authorization"] = localStorage.getItem('jToken')
        const statusCode = response.data.resultCode
        if (statusCode !== 200) return statusCode

        this.loginUserInfo = null
        this.jToken = null
        this.isLogin = false
        localStorage.removeItem('loginUserInfo')
        localStorage.removeItem('jToken')
        return statusCode
      })
    },
  }
})

