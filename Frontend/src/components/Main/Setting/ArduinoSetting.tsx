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
    <button className=" bg-main4 p-5 rounded-full text-left" onClick={sendArduinoRequest}>
      <span>따솜키링 연결</span>
    </button>
  );
};

export default ArduinoSetting;
