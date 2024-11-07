'use client';

import React from 'react';

import Button from '@/components/Common/Button';

const TempComp = () => {
  // React Native WebView로 메시지 보내기
  const sendMessageToApp = (): void => {
    window.ReactNativeWebView.postMessage('Hello from the web page!');
  };

  return (
    <div>
      <Button onClick={sendMessageToApp} label="눌러서 앱으로 이벤트 보내기" />
    </div>
  );
};

export default TempComp;
