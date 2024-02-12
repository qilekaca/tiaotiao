import axios from "axios";
import { showFailToast } from "vant";
import router from "../router";
import { useUserStore } from "../stores/user";

axios.defaults.baseURL =
  import.meta.env.MODE == "development"
    ? "http://localhost:3000/api"
    : "https://api.weiweiwei.site/api";

// 请求拦截器
axios.interceptors.request.use((config) => {
  const userStore = useUserStore();
  config.headers["authorization"] = userStore.token;
  return config;
});

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    const userStore = useUserStore();
    if (error?.response?.status == 401) {
      userStore.token = "";
      userStore.user = {};
    } else {
      showFailToast(error?.response?.data?.errors[0]?.msg);
    }
    return Promise.reject(error?.response?.data);
  }
);

export default axios;
