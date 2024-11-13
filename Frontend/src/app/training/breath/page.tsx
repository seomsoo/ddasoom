'use client';
import React, { useEffect, useState } from 'react';

import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Common/Header';
import BreathSelector from '@/components/Training/Breath/BreathSelector';
import SettingButton from '@/components/Training/Breath/SettingButton';
import SettingContent from '@/components/Training/Breath/SettingContent';
import SettingModal from '@/components/Training/Breath/SettingModal';
import Backcloud from '@/svgs/backcloud.svg';

export default function BreathTrainingPage() {
  const [selectedBreathType, setSelectedBreathType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 초기 로드 시 앱에 메시지 전달
  useEffect(() => {
    if (!selectedBreathType) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          title: 'BREATH',
          content: null,
        }),
      );
    }
  }, []);

  // 앱으로부터 수신된 메시지를 통해 선택된 호흡 유형 설정
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const messageData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const { title, content } = messageData;

        if (title === 'BREATH' && content) {
          setSelectedBreathType(content);
        }
      } catch (e) {
        console.error('Failed to handle message:', e);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSaveSelection = (breathType: string) => {
    setSelectedBreathType(breathType);
    setIsModalOpen(false);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'BREATH',
        content: breathType,
      }),
    );
  };

  return (
    <section className={`${background.background4} absolute inset-0 flex justify-center overflow-hidden text-white`}>
      <div className="absolute top-9 left-2 w-full">
        <Header label="" />
      </div>
      <div className="absolute bottom-0 w-full">
        <Backcloud />
      </div>
      <div className="absolute top-5 right-6">
        <SettingButton onClick={() => setIsModalOpen(true)} />
      </div>
      <main>
        <h1 className="text-4xl font-hakgyoansimR mt-24 mb-5">
          따솜이와 함께 <br />
          호흡에 집중해볼까요?
        </h1>
        <div className="flex items-center justify-center">
          <BreathSelector selectedBreathType={selectedBreathType} />
        </div>
        {isModalOpen && (
          <SettingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            ContentComponent={() => (
              <SettingContent
                selectedBreathType={selectedBreathType}
                onSave={handleSaveSelection}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          />
        )}
      </main>
    </section>
  );
}
