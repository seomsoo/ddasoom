'use client';

import { useState } from 'react';

export default function PushButton() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(newState);

    // React Native 앱에 메시지 보내기
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'NOTI',
        content: newState ? 'yes' : 'no',
      }),
    );
  };

  return (
    <button
      onClick={toggleSwitch} // 버튼 전체에 toggleSwitch 적용
      className="bg-main4 p-5 items-center font-nanumBold flex justify-between rounded-full text-left cursor-pointer">
      <span>Push 알림 </span>
      <div
        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
          isOn ? 'bg-[#a7e48f]' : 'bg-gray4'
        }`}>
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
}
