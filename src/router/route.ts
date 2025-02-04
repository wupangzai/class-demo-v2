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
  {
    path: "/class-arrangement",
    component: () => import("@/components/class-arrangement/index.vue"),
  },
  {
    path: "/course-record",
    component: () => import("@/components/course-record/index.vue"),
  },
  {
    path: "/wage-calc",
    component: () => import("@/components/wage-calc/index.vue"),
  },
];

export default routes;
