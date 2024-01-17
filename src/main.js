import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  Lazyload,
  showToast,
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  showDialog,
  showNotify,
  showImagePreview,
} from "vant";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import VConsole from "vconsole";

const vConsole = new VConsole();

// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);

const pinia = createPinia();

// pinia.use(piniaPluginPersistedstate);
app.use(vConsole);
app.use(pinia);
app.use(router);
app.use(Lazyload);

app.mount("#app");
