import { defineStore } from 'pinia'
import { api } from '@/boot/axios'
import { PATH } from '@/api/path'
import { Notify } from 'quasar'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    loginUserInfo: null,
    isLogin: false 
  }),

  actions: {
    // 로그인
    async signIn(requestBody, router) {
      return await api.post(PATH.LOGIN, requestBody, router).then((response) => {
        const statusCode = response.data.resultCode
        if (statusCode === 300) {
          Notify.create({ type: 'negative', message: '로그인 실패', position: 'top' })
          return
        }
        Notify.create({ type: 'positive', message: '로그인 성공', position: 'top' })
        router.push('/')
        this.loginUserInfo = response.data.resultVO
        this.isLogin = true
        // accessToken 
        api.defaults.headers.common['Authorization'] = response.data.jToken
        sessionStorage.setItem('accessToken', response.data.jToken)
        // refreshToken
        localStorage.setItem('refreshToken', response.data.refreshToken)
      })
      .catch((error) => {
        console.log('로그인 오류 : ' + error)
      })
    },

    // 로그아웃 
    async signOut(router) {
      return await api.get(PATH.LOGOUT, router).then((response) => {
        this.isLogin = false
        this.loginUserInfo = null
        sessionStorage.removeItem('loginUserInfo')
        sessionStorage.removeItem('accessToken')
        delete api.defaults.headers.common['Authorization']
        localStorage.removeItem('refreshToken')
        Notify.create({ message: '로그아웃 성공', position: 'top' })
        router.push('/')
      })
      .catch((error) => {
        console.log('로그아웃 오류 : ' + error)
      })
    },

    // 토큰 검증
    async tokenAuth() {
      return await api.post(PATH.JWT_AUTH).then((response) => {
        const statusCode = response.data.resultCode
        if (statusCode === 200) {
          this.isLogin = true
        }
      })
      .catch((error) => {
        if(error.response.status === 401) {
          api.defaults.headers.common['Authorization'] = localStorage.getItem('refreshToken')
          this.refreshTokenAuth()  // 'this' was missing in original code
        }
        else console.log('엑세스토큰 검증 오류 : ' + error)
      })
    },

    // refreshToken 검증(accessToken 갱신)
    async refreshTokenAuth() {
      return await api.post(PATH.REFRESHTOKEN_AUTH).then((response) => {
        const statusCode = response.data.resultCode
        // accessToken 갱신
        if (statusCode === 200) {
          sessionStorage.setItem('accessToken', response.data.jToken)
          api.defaults.headers.common['Authorization'] = response.data.accessToken
        }
      })
      .catch((error) => {
        // refreshToken 만료(재로그인)
        if (error.response.status === 401) {
          this.isLogin = false
          delete axios.defaults.headers.common['Authorization']
          sessionStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          Notify.create({ type: 'negative', message: '로그인이 만료되었습니다.', position: 'top' })
          router.push('/login')  
        }
        else console.log('리프레시토큰 검증 오류 : ' + error)
      })
    }
  },

  persist: {
    storage: sessionStorage,
    paths: ['loginUserInfo', 'isLogin']
  }
})