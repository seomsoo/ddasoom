'use client';

import Sosbutton from '@/svgs/SosButton.svg';

export default function EmergencyContent() {
  const handleSosClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'SOS', content: null }));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-80 gap-5">
      <h1 className="text-4xl mt-5 text-center font-nanumBold">긴급 상황</h1>
      <span className="text-center">
        도움이 필요하시면
        <br /> 아래의 버튼을 클릭해 주세요!
      </span>
      <button onClick={handleSosClick} className="animate-siren-pulse mt-1">
        <Sosbutton />
      </button>
    </div>
  );
}
