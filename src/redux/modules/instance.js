import axios from "axios";

const instance = axios.create({
  // baseURL: "https://hjkim-sparta.shop",
  baseURL: "https://hjkim-sparta.shop",
});

const token = localStorage.getItem("token");

// 인스턴스가 생성 된 후 기본값 변경
instance.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

export default instance;
