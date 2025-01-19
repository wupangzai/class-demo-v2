import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/home-page/home-page.vue"),
  },
];

export default routes;
