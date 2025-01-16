import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'

export default ({ app }) => {
  const pinia = createPinia()

  // Pinia에 persisted state 플러그인 사용
  pinia.use(piniaPersistedState)

  app.use(pinia)
}
