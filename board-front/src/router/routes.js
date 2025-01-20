import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: () => import("@/pages/MainPage.vue"),
      },
      {
        path: "/login",
        component: () => import("@/pages/LoginPage.vue"),
      },
      {
        path: "/signUp",
        component: () => import("@/pages/SignUpPage.vue"),
      },
      {
        path: "/board/:boardId",
        component: () => import("@/pages/BoardListPage.vue"),
        props: true,
      },
      {
        path: "/board/:boardId/:nttId",
        component: () => import("@/pages/BoardDetailPage.vue"),
        props: true,
      },
      {
        path: "/board/:boardId/mode/:mode",
        component: () => import ("@/pages/BoardEditPage.vue"),
      },
      {
        path: "/mypage",
        component: () => import("@/pages/UserMypage.vue"),
      },
      {
        path: "/find/:type",
        component: () => import("@/pages/FindUserInfoPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/ErrorNotFound.vue"),
  },
];

export default routes;
