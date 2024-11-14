import axios from 'axios';

import { store } from '@/store';
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://k11c103.p.ssafy.io/api',
  withCredentials: true, // 쿠키 필요 시 설정
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(config => {
  const { token } = store.getState().auth; // Redux에서 토큰 가져오기
  console.log('Current Token:', token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 또는 404 상태 코드에 대해 앱에 토큰 요청만 보내기
    if ((error.response?.status === 401 || error.response?.status === 404) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 앱에 GETTOKEN 요청 보내기
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            title: 'GETTOKEN',
            content: null,
          }),
        );

        // 이후 Redux 상태가 업데이트되기를 기대
        return Promise.reject(error); // 현재 요청을 중단하고 오류를 호출한 쪽에서 처리
      } catch (reissueError) {
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
