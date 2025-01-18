import { createApp } from "vue";
import App from "./App.vue";

import packages from "@/packages"; // 三方库的引入

const app = createApp(App);

app.use(packages);

app.mount("#app");
