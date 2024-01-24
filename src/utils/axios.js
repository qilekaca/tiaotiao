import axios from "axios";
import { showFailToast } from "vant";
import router from "../router";

axios.defaults.baseURL =
  import.meta.env.MODE == "development"
    ? "http://192.168.31.148:3000/api"
    : "http://103.140.228.157:3000/api";

// 请求头添加 token
// ⚠️修改此文件需要重启项目使其生效
axios.defaults.headers["authorization"] = localStorage.getItem("token") || "";

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    console.log("axios-response响应拦截器", response);
    // TODO: 添加用户未登陆拦截
    return response.data;
  },
  (error) => {
    console.log(error);
    if (error?.response?.status == 401) {
      router.replace("/login");
    }
    console.log("axios-error响应拦截器" + error);
    showFailToast(error?.response?.data?.errors[0]?.msg);
    return Promise.reject(error?.response?.data);
  }
);

export default axios;
