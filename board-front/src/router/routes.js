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
        component: () => import("@/pages/SignupPage.vue"),
      },
      {
        path: "/board",
        component: () => import("@/pages/BoardPage.vue"),
      },
      {
        path: "/mypage",
        component: () => import("@/pages/UserMypage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/ErrorNotFound.vue"),
  },
];

export default routes;
