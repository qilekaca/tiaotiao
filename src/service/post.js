import axios from "../utils/axios";

// 发布
export function createPost(params) {
  return axios.post("/posts", params);
}

// 获取校内列表
export function getPostsInCollege(params) {
  return axios.get("/posts/in", params);
}

// 获取校外列表
export function getPostsOutCollege(params) {
  return axios.get("/posts/out", params);
}

// export function EditUserInfo(params) {
//   return axios.put("/user/info", params);
// }

// export function login(params) {
//   return axios.post("/user/login", params);
// }

// export function logout() {
//   return axios.post("/user/logout");
// }

// export function register(params) {
//   return axios.post("/user/register", params);
// }
