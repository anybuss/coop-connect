import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/usuarios",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "users-show",
        component: () => import("@/views/UsersShow.vue"),
      },
      {
        path: "novo",
        name: "users-new",
        component: () => import("@/views/UsersNew.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
