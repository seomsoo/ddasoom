'use client';

import { useState } from 'react';

import LoadingModal from './LoadingModal';
import ProgressBar from './ProgressBar';
import RecordButton from './RecordButton';
import script from './scriptData';
import TextScrollComponent from './TextScrollComponent';
import VoiceContent from './VoiceContent';
import VoiceModal from './VoiceModal';
export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [voiceName, setVoiceName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setCurrentLine(0);
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ title: 'RECORD', content: { state: 'STOPAIR', name: voiceName } }),
        );
      }
    } else {
      // 녹음 시작 시 메시지 전송
      setIsRecording(true);
      setCurrentLine(0); // 텍스트 애니메이션을 처음 상태로 초기화
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ title: 'RECORD', content: { state: 'ONAIR', name: voiceName } }),
        );
      }
    }
  };

  const handleTextEnd = () => {
    // 텍스트가 끝나면 녹음 중지하고 종료 메시지 전송
    setIsRecording(false);
    setCurrentLine(0);
    setIsLoading(true);
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ title: 'RECORD', content: { state: 'OFFAIR', name: voiceName } }),
      );
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center mt-32 w-full">
      {isLoading && <LoadingModal />}
      <ProgressBar currentLine={currentLine} totalLines={script.length} />
      <VoiceModal ContentComponent={VoiceContent} voiceName={voiceName} setVoiceName={setVoiceName} />
      <TextScrollComponent
        isRecording={isRecording}
        currentLine={currentLine}
        setCurrentLine={setCurrentLine}
        onTextEnd={handleTextEnd} // 텍스트가 끝나면 handleTextEnd 호출
      />
      <div className="mt-9 z-10">
        <RecordButton onClick={handleToggleRecording} isRecording={isRecording} />
      </div>
    </div>
  );
}
