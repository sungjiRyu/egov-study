import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

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
    Router.beforeEach((to, from, next) => {
    const allowedBoards = ['notice', 'gallery'] // 허용되는 boardId 목록

    // '/board/:boardId' 라우트에서 boardId가 허용된 목록에 없으면 404 페이지로 리다이렉트
    if (to.path.startsWith('/board/') && !allowedBoards.includes(to.params.boardId)) {
      next('/ErrorNotFound')
    } else {
      // '/board/:boardId/:nttId' 라우트에서 추가적인 검사
      if (to.path.includes('/board/') && to.params.nttId && !to.params.boardId) {
        next('/ErrorNotFound')
      } else {
        next()
      }
    }
  })
  return Router
})
