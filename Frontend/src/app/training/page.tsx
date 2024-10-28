import React from 'react';

import Navbar from '@/components/Navbar';

export default function Training() {
  return (
    <div className="flex flex-col items-center gap-6 mt-14 max-h-screen  ">
      <div className="flex ml-8 bg-main4 border border-r-0 border-main1 shadow-md rounded-l-2xl w-full max-w-md p-4 py-6 mb-4 ">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-nanumBold">호흡 연습</h2>
          <p className="text-sm">
            세 가지 호흡법 중 <br />
            나에게 맞는 방법을 골라 연습해보세요.
          </p>
        </div>
      </div>

      <div className="flex mr-8 items-start border-l-0 bg-main4 border border-main1 shadow-md rounded-r-2xl w-full max-w-md p-4 py-6 mb-4">
        <div className="flex flex-col gap-2 text-right flex-grow">
          <h2 className="text-3xl font-nanumBold">그라운딩</h2>
          <div className="text-sm">
            <p className="mr-1">감각에 집중하여</p>
            <p> 지금 이 순간을 온전히 느껴보세요.</p>
          </div>
        </div>
      </div>

      <div className=" flex ml-8 border-r-0 bg-main4 border border-main1 shadow-md rounded-l-2xl w-full max-w-md p-4 py-6 mb-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-nanumBold">안정화 기법</h2>
          <div className="text-sm">
            <p className="ml-[0.8px]">자연의 움직임을 보며</p>
            <p>긴장된 마음과 몸을 풀어보세요.</p>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
