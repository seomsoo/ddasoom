'use client';
import React from 'react';

interface VoiceContentProps {
  voiceName: string;
  setVoiceName: (value: string) => void;
}

export default function VoiceContent({ voiceName, setVoiceName }: VoiceContentProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoiceName(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={voiceName}
        onChange={handleInputChange}
        placeholder="이름을 입력하세요"
        className="caret-transparent mt-1 p-3 border text-lg text-center border-gray-300 focus:outline-none font-hakgyoansimR focus:border-main1 rounded-xl w-full"
      />
      <p className="mt-2 text-sm text-center text-gray5">
        편안함을 느끼는 목소리나 <br />
        듣고 싶은 소중한 목소리를 설정해 주세요.
      </p>
    </div>
  );
}
