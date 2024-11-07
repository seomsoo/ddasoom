'use client';

import { useState } from 'react';

import ProgressBar from './ProgressBar';
import RecordButton from './RecordButton';
import script from './scriptData';
import TextScrollComponent from './TextScrollComponent';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentLine, setCurrentLine] = useState<number>(0);

  const handleToggleRecording = () => {
    if (isRecording) {
      // 녹음 중지하고 초기화 (메시지 전송 없이)
      setIsRecording(false);
      setCurrentLine(0); // 텍스트 애니메이션을 처음 상태로 초기화
    } else {
      // 녹음 시작 시 메시지 전송
      setIsRecording(true);
      setCurrentLine(0); // 텍스트 애니메이션을 처음 상태로 초기화
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'RECORD', content: 'ONAIR' }));
      }
    }
  };

  const handleTextEnd = () => {
    // 텍스트가 끝나면 녹음 중지하고 종료 메시지 전송
    setIsRecording(false);
    setCurrentLine(0); // 텍스트 애니메이션을 처음 상태로 초기화
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'RECORD', content: 'OFFAIR' }));
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center mt-32 w-full">
      <ProgressBar currentLine={currentLine} totalLines={script.length} />
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
