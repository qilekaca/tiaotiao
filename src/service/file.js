import axios from "../utils/axios";

// 上传图片
export function uploadImage(body) {
  return axios.post("/file", body);
}

// 获取图片
export function getImage(id) {
  return axios.get(`/file/${id}`);
}

// 删除图片
export function deleteImage(id) {
  return axios.delete(`/file/${id}`);
}
