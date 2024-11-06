'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAuthData } from '../store/authSlice';

// 테스트용 초기 토큰 데이터
const initialTestToken =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEREFTT09NIiwiaWF0IjoxNzMwOTAxMTAzLCJleHAiOjE3MzA5MDI5MDMsInVzZXJJZCI6MSwidXNlck5hbWUiOiLquYDrkZDsl7QifQ.DPIECcZpPpf6njb89HHNkPOexwC0f9m06rzVd6g7N1uZoRErtSO6ZzplCPwlXijN9Ij4Z8_mjL0h6cRvM90VbQ';

const useAuth = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(initialTestToken); // 초기값 설정
  const [userName, setUserName] = useState<string | null>(null); // 초기값 설정
  const [userId, setUserId] = useState<number | null>(null); // 초기값 설정

  const sendMessageToApp = () => {
    const message = 'GETTOKEN';
    window.ReactNativeWebView?.postMessage(message);
  };

  useEffect(() => {
    if (!token || !userName || !userId) {
      sendMessageToApp();
    }

    const handleMessage = (event: MessageEvent) => {
      try {
        const parsedData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const { title, content } = parsedData;

        if (title === 'TOKEN') {
          console.log('앱에서 받아온 토큰 정보들 저장 완료');
          setUserName(content.userName);
          setToken(content.token);
          setUserId(content.userId);

          // Redux에 토큰과 사용자 정보 저장
          dispatch(setAuthData({ token: content.token, userName: content.userName, userId: content.userId }));
        } else {
          // title이 'TOKEN'이 아닌 경우 토큰 값을 추출
          const possibleToken = content?.token || initialTestToken;
          setToken(possibleToken);
          console.log('앱에서 받은 title이 TOKEN이 아닌 경우 토큰:', possibleToken);

          // Redux에 기본 토큰 설정
          dispatch(setAuthData({ token: possibleToken, userName, userId }));
        }
      } catch (e) {
        console.error('Failed to handle message:', e);
      }
    };

    window.addEventListener('message', handleMessage);

    // 클린업 함수
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch, token, userName, userId]);

  return { token, userName, userId };
};

export default useAuth;
