import axios from "../utils/axios";

// 上传图片COS
export function uploadImage(body) {
  return axios.post("/file/image", body);
}

// 删除图片
export function deleteImage(key) {
  return axios.delete(`/file/image/${key}`);
}

// 上传图片
export function uploadImages(body) {
  return axios.post("/file", body);
}

// 获取图片
export function getImage(id) {
  return axios.get(`/file/${id}`);
}

// 删除图片
// export function deleteImage(id) {
//   return axios.delete(`/file/${id}`);
// }
