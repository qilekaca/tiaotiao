import axios from "../utils/axios";

// 发布
export function createPost(params) {
  return axios.post("/posts", params);
}

export function getPosts(params) {
  return axios.get("/posts", params);
}

export function getPost(id) {
  return axios.get(`/posts/${id}`);
}
