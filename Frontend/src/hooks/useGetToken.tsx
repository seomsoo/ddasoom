// 'use client';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { setAuthData } from '../store/authSlice';

// const initialTestData =
//   'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEREFTT09NIiwiaWF0IjoxNzMwODYyNzYxLCJleHAiOjE3MzA4NjQ1NjEsInVzZXJJZCI6MSwidXNlck5hbWUiOiLquYDrkZDsl7QifQ.6H4LxyWkaymC9SyhT4cuVObtBgwkZ4R-HtKN5TRGGQkuuLtXAF0OYI-c4_Jez6nxI9cNym4zCLBCwuRqeymDyg';
// /** 토큰 정보(토큰, 유저 이름, 유저id) */
// const useAuth = () => {
//   const dispatch = useDispatch();
//   const [token, setToken] = useState<Token | null>(initialTestData);
//   const [userName, setUserName] = useState<Name | null>(null);
//   const [userId, setUserId] = useState<UserId | null>(null);

//   const sendMessageToApp = () => {
//     const message = 'GETTOKEN';
//     window.ReactNativeWebView?.postMessage(message);
//   };

//   useEffect(() => {
//     // 토큰이 없을 때만 앱에 메시지 전송
//     if (!token || !userName || !userId) {
//       sendMessageToApp();
//     }

//     const handleMessage = (event: MessageEvent) => {
//       try {
//         console.log('Received event data:', event.data);
//         // const { title, content } = JSON.parse(event.data);

//         // `event.data`가 객체인지 문자열인지 확인
//         const parsedData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
//         const { title, content } = parsedData;
//         if (title === 'TOKEN') {
//           console.log('앱에서 받아온 토큰 정보들 저장 완료');
//           setUserName(content.userName);
//           setToken(content.token);
//           setUserId(content.userId);
//           // Redux에 토큰과 사용자 정보 저장
//           dispatch(setAuthData({ token: content.token, userName: content.userName, userId: content.userId }));
//         }
//       } catch (e) {
//         console.error('Failed to handle message:', e);
//       }
//     };

//     window.addEventListener('message', handleMessage);

//     // 클린업 함수
//     return () => {
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [dispatch, token, userName, userId]);

//   return { token, userName, userId };
// };

// export default useAuth;

'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAuthData } from '../store/authSlice';

// 테스트용 초기 토큰 데이터
const initialTestToken =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEREFTT09NIiwiaWF0IjoxNzMwODgwMDEwLCJleHAiOjE3MzA4ODE4MTAsInVzZXJJZCI6MSwidXNlck5hbWUiOiLquYDrkZDsl7QifQ.D9agrKpIvWxTecUvgZT6-eIo6X1-aqvaLwgEkwal-kXRL8Po2wJfnsDR-OfU5VXOrZOKj7BTIJg_rI47-ItKQg';

const useAuth = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(initialTestToken); // 초기값 설정
  const [userName, setUserName] = useState<string | null>('테스트 유저'); // 초기값 설정
  const [userId, setUserId] = useState<number | null>(2); // 초기값 설정

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
