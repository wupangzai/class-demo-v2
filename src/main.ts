import { createApp } from "vue";
import App from "./App.vue";

import packages from "@/packages"; // 三方库的引入

import "@/assets/css/index.less"; // normalize.less

import router from "./router";

const app = createApp(App);

app.use(packages);

app.use(router); // router

app.mount("#app");
