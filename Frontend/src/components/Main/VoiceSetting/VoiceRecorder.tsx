'use client';

import { useState } from 'react';

import RecordButton from './RecordButton';
import ProgressBar from './ProgressBar';
import TextScrollComponent from './TextScrollComponent';
import script from './scriptData';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentLine, setCurrentLine] = useState<number>(0);

  const handleToggleRecording = () => {
    setIsRecording(prev => !prev);
  };

  return (
    <div className="flex flex-col gap-10 items-center mt-32 w-full ">
      <ProgressBar currentLine={currentLine} totalLines={script.length} />
      <TextScrollComponent isRecording={isRecording} currentLine={currentLine} setCurrentLine={setCurrentLine} />
      <div className="mt-9 z-10">
        <RecordButton onClick={handleToggleRecording} isRecording={isRecording} />
      </div>
    </div>
  );
}
