import axios from "../utils/axios";

// export function getUserInfo() {
//   return axios.get("/user/info");
// }
// 获取校内列表
export function getPostsInCollege(params) {
  return axios.get("/post/in", params);
}
// 获取校外列表
export function getPostsOutCollege(params) {
  return axios.get("/post/out", params);
}

// 上传图片
export function uploadImage(body) {
  return axios.post("/file", body);
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
