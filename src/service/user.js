import axios from "@/utils/axios";

export function getCurrentUser() {
  return axios.get("/user");
}

export function updateUser(params) {
  return axios.put("/user", params);
}

export function login(params) {
  return axios.post("/users/login", params);
}

export function register(params) {
  return axios.post("/users/register", params);
}

export function addCollection(postid) {
  return axios.put(`/user/${postid}`);
}
