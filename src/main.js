import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
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

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(Lazyload);

app.mount("#app");
