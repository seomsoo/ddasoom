'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ErrorModal from '@/components/Common/ErrorModal';

import { setAuthData } from '../store/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<Token | null>(null);
  const [userName, setUserName] = useState<Name | null>(null);
  const [userId, setUserId] = useState<UserId | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 에러 모달 상태
  const [errorContext, setErrorContext] = useState(''); // 에러 메시지 상태

  const sendMessageToApp = () => {
    window.ReactNativeWebView?.postMessage(JSON.stringify({ title: 'GETTOKEN', content: null }));
  };

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!token || !userName || !userId) {
        sendMessageToApp();
      }
    };

    const handleMessage = async (event: MessageEvent) => {
      try {
        // JSON 파싱을 시도하기 전에, event.data가 문자열인지 확인
        const messageData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        const { title, content } = messageData;

        if (title === 'TOKEN') {
          console.log('앱에서 받아온 토큰 정보들 저장 완료');
          setUserName(content.userName);
          setToken(content.token);
          setUserId(content.userId);

          // Redux에 토큰과 사용자 정보 저장
          dispatch(setAuthData({ token: content.token, userName: content.userName, userId: content.userId }));
        } else {
          console.log('title이 TOKEN 아님');
        }
      } catch (e) {
        console.error('Failed to handle message:', e);
        setErrorContext(e instanceof Error ? e.message : '에러 메시지 읽기 실패');
        setIsErrorModalOpen(true); // 에러 발생 시 모달 표시
      }
    };

    fetchTokenData(); // 비동기 함수 실행

    window.addEventListener('message', handleMessage);

    // 클린업 함수
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch, token, userName, userId]);

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    sendMessageToApp(); // 메시지 다시 전송
  };

  return {
    token,
    userName,
    userId,
    ErrorModalComponent: isErrorModalOpen ? (
      <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
    ) : null,
  };
};

export default useAuth;
