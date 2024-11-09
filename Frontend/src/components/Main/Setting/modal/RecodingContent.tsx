'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Green from '@/svgs/Ddasomiz/greenSomi.svg';
import Orange from '@/svgs/Ddasomiz/orangeSomi.svg';
import White from '@/svgs/Ddasomiz/whiteSomi.svg';
import Yellow from '@/svgs/Ddasomiz/yellowSomi.svg';

interface RecodingContentProps {
  closeModal: () => void;
}

export default function RecodingContent({ closeModal }: RecodingContentProps) {
  const router = useRouter();
  const goToRecodingPage = () => {
    router.push('/main/setting/recoding');
  };

  const icons = [Green, Orange, White, Yellow];
  const dummyVoices = [
    { id: 1, voiceName: '목소리1' },
    { id: 2, voiceName: '목소리2' },
  ];

  const [selectedVoiceId, setSelectedVoiceId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedVoiceId(id);
  };

  return (
    <div className="flex flex-col items-center w-full p-4 max-w-md mx-auto space-y-6">
      <header className="text-2xl font-semibold mb-2 flex flex-col items-center gap-2">
        <span>목소리 설정</span>
        <p className="text-sm opacity-50 text-nowrap">가장 익숙한 목소리로, 특별한 순간을 함께하세요.</p>
      </header>

      <main className="flex border-2 rounded-xl border-main2 flex-col w-full space-y-2 max-h-72 min-h-72 overflow-y-scroll">
        {dummyVoices.map((voice, index) => {
          const Icon = icons[index % icons.length];
          const isSelected = selectedVoiceId === voice.id;
          return (
            <div
              key={voice.id}
              onClick={() => handleSelect(voice.id)}
              className={`flex items-center justify-between w-full p-2 my-2 px-5 rounded-full cursor-pointer 
              ${isSelected ? 'bg-main1 bg-opacity-20 border-main1' : 'border-gray4'}`}>
              <section className="flex items-center gap-5">
                <Icon width={35} height={35} />
                <span className={`font-hakgyoansimR text-lg ${isSelected ? 'text-main1' : 'text-gray5'}`}>
                  {voice.voiceName}
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
      <section className="flex gap-4 text-white w-full mt-5">
        <button onClick={closeModal} className="bg-main1 p-3 px-6 rounded-full flex-1 font-nanumBold">
          저장하기
        </button>
        <button onClick={goToRecodingPage} className="bg-button1 p-3 px-6 rounded-full flex-1 font-nanumBold">
          녹음하기
        </button>
      </section>
    </div>
  );
}
