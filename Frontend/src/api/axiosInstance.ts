import axios from 'axios';

import { store } from '@/store';
import { setAuthData } from '@/store/authSlice';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://k11c103.p.ssafy.io/api',
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(config => {
  const { token } = store.getState().auth;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// 토큰 요청 함수
export const requestTokenFromApp = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const messageData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (messageData.title === 'TOKEN') {
          const { token } = messageData.content;
          // Redux에 새 토큰 저장
          store.dispatch(
            setAuthData({ token, userName: store.getState().auth.userName, userId: store.getState().auth.userId }),
          );
          resolve(token);
        } else {
          reject(new Error('토큰 요청 실패'));
        }
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          title: 'GETTOKEN',
          content: null,
        }),
      );
      console.log('GETTOKEN 요청이 전송되었습니다.');
    } else {
      console.error('ReactNativeWebView 객체가 정의되지 않았습니다.');
      reject(new Error('ReactNativeWebView가 정의되지 않음'));
    }
  });
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 404) && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('토큰 갱신 시도 중...');

      try {
        const newToken = await requestTokenFromApp();
        console.log('새로운 토큰 갱신 성공:', newToken);

        store.dispatch(
          setAuthData({
            token: newToken,
            userName: store.getState().auth.userName,
            userId: store.getState().auth.userId,
          }),
        );
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // 요청 다시!
        return axiosInstance(originalRequest);
      } catch (reissueError) {
        console.error('토큰 갱신 실패:', reissueError);
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
