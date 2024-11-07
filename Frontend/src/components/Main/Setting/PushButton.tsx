'use client';

import { useState } from 'react';

export default function PushButton() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOn(!isOn);
  };
  return (
    <button className="bg-main4 p-5 items-center font-nanumBold flex justify-between rounded-full text-left">
      <span>Push 알림 </span>
      <div
        onClick={toggleSwitch}
        className={`w-14 h-8 flex items-center  rounded-full p-1  cursor-pointer transition-colors duration-300 ${
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
