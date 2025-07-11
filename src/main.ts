import { createApp } from "vue";
import App from "./App.vue";

import packages from "@/packages"; // 三方库的引入

import "@/assets/css/index.less"; // normalize.less

import router from "./router";

import { store, key } from "./store";

import { initApp } from "@/components/common/dialog";

import registerDirectives from "@/directives";

const app = createApp(App);

app.use(packages);

app.use(router); // router

app.use(store, key); // store

app.use(registerDirectives); // 注册自定义指令

initApp(app); // 传入app实例给 useDialog hook，获取elementu组件等

app.mount("#app");
