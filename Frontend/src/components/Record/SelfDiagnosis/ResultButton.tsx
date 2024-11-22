// 'use client';

// import { useRouter } from 'next/navigation';

// import React, { useEffect } from 'react';
// import Button from '@/components/Common/Button';
// interface ResultContextProps {
//   isPanicSuspected: boolean;
// }

// export default function ResultButton({ isPanicSuspected }: ResultContextProps) {
//   const router = useRouter();

//   // WebView에서 GPS 요청 메시지 보내기
//   useEffect(() => {
//     window.ReactNativeWebView?.postMessage(
//       JSON.stringify({
//         title: 'GPS',
//         content: null,
//       }),
//     );
//   }, []);
//   const handleMoveMain = () => {
//     router.push('/main');
//   };

//   const handleMoveTraining = () => {
//     router.push('/training');
//   };

//   const handleViewHospitals = () => {
//     router.push('/record/selfDiagnosis/hospitals');
//   };

//   return (
//     <div className="felx flex-col text-center w-full">
//       {isPanicSuspected ? (
//         <Button label="근처 병원 보기" className="mt-8" onClick={handleViewHospitals} />
//       ) : (
//         <Button label="훈련하기" className="mt-3" onClick={handleMoveTraining} />
//       )}
//       <button className="underline underline-offset-4 mt-2 text-gray5" onClick={handleMoveMain}>
//         건너뛰기
//       </button>
//     </div>
//   );
// }

'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import ErrorModal from '@/components/Common/ErrorModal';

interface ResultContextProps {
  isPanicSuspected: boolean;
}

export default function ResultButton({ isPanicSuspected }: ResultContextProps) {
  const router = useRouter();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');
  const [receivedLocation, setReceivedLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 35.2052474,
    longitude: 126.8117694, // 기본 위치
  });

  // WebView에서 GPS 요청 메시지 보내기
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'GPS',
        content: null,
      }),
    );
  }, []);

  // WebView에서 GPS 위치 메시지 수신
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        const parsedMessage = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (parsedMessage.title === 'CURRENTLOCATION' && parsedMessage.latitude && parsedMessage.longitude) {
          setReceivedLocation({
            latitude: parsedMessage.latitude,
            longitude: parsedMessage.longitude,
          });
        } else {
          setErrorContext('GPS 데이터가 유효하지 않아 기본 위치를 사용합니다.');
        }
      } catch (error) {
        console.log(error);
        setErrorContext('GPS 데이터를 받을 수 없어 기본 위치를 사용합니다.');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleViewHospitals = () => {
    // receivedLocation 데이터를 localStorage에 저장
    localStorage.setItem('receivedLocation', JSON.stringify(receivedLocation));

    // 병원 보기 페이지로 이동
    router.push('/record/selfDiagnosis/hospitals');
  };

  const handleRetry = () => {
    return;
  };

  return (
    <div className="flex flex-col text-center w-full">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
      {isPanicSuspected ? (
        <Button label="근처 병원 보기" className="mt-8" onClick={handleViewHospitals} />
      ) : (
        <Button label="훈련하기" className="mt-3" onClick={() => router.push('/training')} />
      )}
      <button className="underline underline-offset-4 mt-2 text-gray5" onClick={() => router.push('/main')}>
        건너뛰기
      </button>
    </div>
  );
}
