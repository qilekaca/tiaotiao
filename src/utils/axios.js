import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.MODE == "development"
    ? "http://192.168.31.148:3000/api"
    : "http://192.168.31.148:3000/api";

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
    console.log("axios-error响应拦截器" + error);
    return Promise.reject(error.response.data);
  }
);

export default axios;
