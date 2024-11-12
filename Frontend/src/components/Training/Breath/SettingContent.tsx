import React, { useState } from 'react';

interface BreathOption {
  id: number;
  label: string;
  content: string;
}

interface SettingContentProps {
  onClose: () => void;
}

export default function SettingContent({ onClose }: SettingContentProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const breathOptions: BreathOption[] = [
    { id: 1, label: '기본 호흡 (4·7·8)', content: 'basicTime' },
    { id: 2, label: '짧은 호흡 (4·4·4·4)', content: 'shortTime' },
    { id: 3, label: '긴 호흡 (5·7·3)', content: 'longTime' },
  ];

  const handleSelect = (id: number) => {
    setSelectedOption(id);
  };

  const handleSave = () => {
    if (selectedOption !== null) {
      const selectedBreath = breathOptions.find(option => option.id === selectedOption);
      if (selectedBreath) {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            title: 'BREATH',
            content: selectedBreath.content,
          }),
        );
        onClose();
      }
    }
  };

  return (
    <div className="flex flex-col z-30 items-center min-h-80 gap-5 mt-8 text-black">
      <h1 className="text-4xl mt-5 text-center font-nanumBold">호흡법 설정</h1>
      <span className="text-center text-sm">
        본인에게 맞는 호흡법을 설정해두면, <br /> 긴급 상황에서 바로 적용됩니다.
      </span>

      <main className="flex gap-2 flex-col w-full">
        {breathOptions.map(option => {
          const isSelected = option.id === selectedOption;
          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`flex items-center justify-between w-full p-2 px-4 rounded-xl cursor-pointer
              ${isSelected ? 'bg-main1 bg-opacity-20 border-main1' : 'bg-gray1 border-gray4'}`}>
              <section className="flex items-center">
                <span className={`font-hakgyoansimR text-xl ${isSelected ? 'text-main1' : 'text-gray5'}`}>
                  {option.label}
                </span>
              </section>
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-md border-2 transition-all duration-200 
                ${isSelected ? 'border-main1 bg-main1 text-white' : 'border-gray4'}`}>
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </main>

      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-main1 text-white rounded-full transition-all duration-200">
        저장하기
      </button>
    </div>
  );
}
