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
  {
    path: "/class-form",
    component: () => import("@/components/class-form/index.vue"),
  },
  {
    path: "/ielts-assignment",
    component: () => import("@/components/ielts-assignment/assignment.vue"),
  },
  {
    path: "/ielts-test",
    component: () => import("@/components/ielts-assignment/ielts-test.vue"),
  },
  {
    path: "/ielts-pastpaper",
    component: () =>
      import("@/components/ielts-assignment/ielts-pastpaper.vue"),
  },
  {
    path: "/todo-list",
    component: () => import("@/components/todo-list/index.vue"),
  },
];

export default routes;
