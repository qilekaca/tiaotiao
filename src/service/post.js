import axios from "../utils/axios";

// 发布
export function createPost(params) {
  return axios.post("/posts", params);
}

// 查询
export function getPosts(params) {
  return axios.get("/posts", params);
}

// 查询详细信息
export function getPost(postid) {
  return axios.get(`/posts/${postid}`);
}

// 获取评论
export function getPostComment(postid) {
  return axios.get(`/posts/${postid}/comments`);
}

// 发布评论
// {
//   content: ""
// }
export function createPostComment(postid, comment) {
  return axios.post(`/posts/${postid}/comments`, comment);
}

// 删除评论
export function deletePostComment(postid, commentid) {
  return axios.delete(`/posts/${postid}/comments/${commentid}`);
}
