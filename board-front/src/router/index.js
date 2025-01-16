import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/stores/user'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */



export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // router guard (notice, gallery 제외한 url 입력시 404페이지로 리턴)
    Router.beforeEach(async(to, from, next) => {
    const allowedBoards = ['notice', 'gallery'] // 허용되는 boardId 목록

    const userStore = useUserStore()
    // 로그인 상태일 때 토큰 검증
    if (userStore.isLogin) {      
      await userStore.tokenAuth()
    }

    // 로그인 상태에서 /login 또는 /signup 페이지로 이동하려고 하면 /로 리다이렉트
    if (userStore.isLogin && ['/login', '/signup'].includes(to.path)) {
      next('/');
    }

    // '/board/:boardId' 라우트에서 boardId가 허용된 목록에 없으면 404 페이지로 리다이렉트
    if (to.path.startsWith('/board/') && !allowedBoards.includes(to.params.boardId)) {
      next('/ErrorNotFound')
    } else {
      next()
    }
  })

  return Router
})
