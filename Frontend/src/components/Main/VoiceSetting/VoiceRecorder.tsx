'use client';

import { useRef, useState } from 'react';

import ProgressBar from './ProgressBar';
import RecordButton from './RecordButton';
import script from './scriptData';
import TextScrollComponent from './TextScrollComponent';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(0);

  const handleToggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = event => {
        audioChunks.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/ogg; codecs=opus' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunks.current = [];
      };
      mediaRecorderRef.current.start();
    }
    setIsRecording(prev => !prev);
  };

  return (
    <div className="flex flex-col gap-10 items-center mt-32 w-full">
      <ProgressBar currentLine={currentLine} totalLines={script.length} />
      <TextScrollComponent isRecording={isRecording} currentLine={currentLine} setCurrentLine={setCurrentLine} />
      <div className="mt-9 z-10">
        <RecordButton onClick={handleToggleRecording} isRecording={isRecording} />
      </div>
      {audioUrl && (
        <audio controls className=" z-10">
          <source src={audioUrl} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
