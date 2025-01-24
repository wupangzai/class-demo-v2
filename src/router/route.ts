import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/pages/home-page.vue"),
  },
  {
    path: "/tomorrow-course-remind",
    component: () => import("@/components/tomorrow-course-remind/index.vue"),
  },
];

export default routes;
