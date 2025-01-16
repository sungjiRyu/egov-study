import { defineStore } from 'pinia'
import { api } from '@/boot/axios'
import { PATH } from '@/api/path'
import { useRouter } from 'vue-router'
import { Cookies } from 'quasar'
import axios from 'axios'

const router = useRouter()

export const useUserStore = defineStore('user', {
  state: () => ({
    loginUserInfo: JSON.parse(localStorage.getItem('loginUserInfo')),
    isLogin: false 
  }),

  actions: {
    async signIn(requestBody) {
      return await api.post(PATH.LOGIN, requestBody).then((response) => {
        const statusCode = response.data.resultCode
        if (statusCode !== 200) return statusCode

        this.loginUserInfo = response.data.resultVO
        this.isLogin = true
        localStorage.setItem('loginUserInfo', JSON.stringify(response.data.resultVO))
        // accessToken 
        api.defaults.headers.common["Authorization"] = response.data.jToken
        localStorage.setItem('accessToken', response.data.jToken)
        // refreshToken
        Cookies.set('refreshToken', response.data.refreshToken, {
          expires: 7,               
          secure: true,     
          sameSite: 'Strict'
        })    
        return statusCode
      })
    },

    async signOut() {
      return await api.get(PATH.LOGOUT).then((response) => {
        const statusCode = response.data.resultCode
        if (statusCode !== 200) return statusCode

        this.isLogin = false
        localStorage.removeItem('loginUserInfo')
        localStorage.removeItem('accessToken')
        delete api.defaults.headers.common["Authorization"]
        Cookies.remove('refreshToken', {
          secure: true,
          sameSite: 'Strict'
        });
        return statusCode
      })
    },

    // 토큰 검증 로직
    async tokenAuth() {
      return await api.post(PATH.JWT_AUTH).then((response) => {
        const statusCode = response.data.resultCode
        if (statusCode === 200) {
          this.isLogin = true
        }
        if (statusCode === 403) { // accessToken 만료(accessToken 을 갱신한다)
          api.defaults.headers.common["Authorization"] = Cookies.get('refreshToken')
          refreshTokenAuth()
        }
        if (statusCode === 409) { // refreshToken 만료 (재로그인)
          this.isLogin = false
          delete axios.defaults.headers.common["Authorization"]
          localStorage.removeItem('accessToken')
          Cookies.remove('refreshToken', {
            secure: true,
            sameSite: 'Strict'
          });
          Notify.create({ type: 'negative', message: '로그인이 만료되었습니다.', position: 'top' })
          router.push('/login')
        }
        
      })
    },

    // refreshToken 검증(accessToken 갱신) 로직
    async refreshTokenAuth() {
      return await api.post(PATH.REFRESHTOKEN_AUTH).then((response) => {
        const statusCode = response.data.resultCode
        // accessToken 갱신
        if (statusCode === 200) {
          localStorage.setItem('accessToken', response.data.jToken)
          api.defaults.headers.common["Authorization"] = response.data.accessToken
        }
        // refreshToken 만료(재로그인)
        if (statusCode === 403) {
          this.isLogin = false
          delete axios.defaults.headers.common["Authorization"]
          localStorage.removeItem('accessToken')
          Cookies.remove('refreshToken', {
            secure: true,
            sameSite: 'Strict'
          });
          Notify.create({ type: 'negative', message: '로그인이 만료되었습니다.', position: 'top' })
          router.push('/login')  
        }
      })
    }
  },
   // persist 설정
   persist: {
    enabled: true, // 로컬스토리지에 상태를 저장하도록 설정
    strategies: [
      {
        key: 'user', // 로컬스토리지에 저장될 키
        storage: localStorage, // 로컬스토리지 사용
      }
    ]
  }
})

