import axios from 'axios';

import { store } from '@/store';
import { setAuthData } from '@/store/authSlice';

import { reissueToken } from './authAPI';

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

    // 401 또는 404 상태 코드에 대해 토큰 재발급 시도
    if ((error.response?.status === 401 || error.response?.status === 404) && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지
      try {
        // 토큰 재발급 요청
        const reissueResponse = await reissueToken();

        // 새로운 토큰, userName, userId로 Redux 상태 업데이트
        store.dispatch(
          setAuthData({
            token: reissueResponse.data.token,
            userName: reissueResponse.data.userName,
            userId: reissueResponse.data.userId,
          }),
        );

        // 재발급된 토큰으로 원래 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${reissueResponse.data.token}`;
        return axiosInstance(originalRequest);
      } catch (reissueError) {
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
