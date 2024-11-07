import axios from 'axios';

import { store } from '@/store';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://k11c103.p.ssafy.io/api',
  withCredentials: true, // 쿠키 필요 시 설정
});
axiosInstance.interceptors.request.use(config => {
  const { token } = store.getState().auth; // Redux에서 토큰 가져오기
  console.log('Current Token:', token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export default axiosInstance;
