'use client';
import React from 'react';
import Enter from '@/svgs/enterIcon.svg';
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
    <button
      className=" bg-main4 p-5 rounded-full flex justify-between text-left font-nanumBold w-full"
      onClick={sendArduinoRequest}>
      <span>따솜키링 연결</span>
      <Enter />
    </button>
  );
};

export default ArduinoSetting;
