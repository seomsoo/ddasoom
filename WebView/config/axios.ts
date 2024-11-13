import useAuthStore from "@/zustand/authStore";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://k11c103.p.ssafy.io",
  timeout: 2500,
  withCredentials: true,
});

instance.interceptors.request.use(
  async config => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(async response => {
  console.log("성공");
  return response;
});
