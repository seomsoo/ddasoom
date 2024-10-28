import React from 'react';

import Navbar from '@/components/Navbar';

export default function Training() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="flex bg-main4 border border-main1 shadow-md rounded-lg w-full max-w-md p-4 mb-4">
        <div>
          <h2 className="text-lg font-nanumBold">호흡 연습</h2>
          <p className="text-sm">세 가지 호흡법 중 나에게 맞는 방법을 골라 연습해보세요.</p>
        </div>
      </div>

      <div className="flex items-start border border-main1 bg-main4 shadow-md rounded-lg w-full max-w-md p-4 mb-4">
        <div>
          <h2 className="text-lg font-nanumBold">그라운딩</h2>
          <p className="text-sm ">감각에 집중하여 지금 이 순간을 온전히 느껴보세요.</p>
        </div>
      </div>

      <div className="flex items-start border border-main1 bg-main4 shadow-md rounded-lg w-full max-w-md p-4 mb-16">
        <div>
          <h2 className="text-lg font-nanumBold">안정화 기법</h2>
          <p className="text-sm">자연의 움직임을 보며 긴장된 마음과 몸을 풀어보세요.</p>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
