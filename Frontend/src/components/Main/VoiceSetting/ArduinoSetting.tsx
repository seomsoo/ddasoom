'use client';
import React from 'react';

const ArduinoSetting = () => {
  // 메시지 보내기
  const sendArduinoRequest = () => {
    console.log('ARDSETTING');
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        title: 'ARDSETTING',
        content: null,
      }),
    );
  };

  return (
    <button className="bg-main3 p-4 rounded-full font-nanumBold text-2xl" onClick={sendArduinoRequest}>
      따소미 설정
    </button>
  );
};

export default ArduinoSetting;
