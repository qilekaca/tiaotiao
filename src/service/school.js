import axios from "../utils/axios";

// 获取图片
export function getSchool(city) {
  return axios.get(`/school/${city}`);
}
