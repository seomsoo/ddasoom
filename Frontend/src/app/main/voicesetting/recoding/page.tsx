import background from '@/components/BackGround/Background.module.css';
import WaveAnimation from '@/components/BackGround/WaveAnimation';
import VoiceRecorder from '@/components/Main/VoiceSetting/VoiceRecorder';
import Header from '@/components/Header';

export default function VoiceRecordingPage() {
  return (
    <div
      className={`${background.background3} fixed inset-0 overflow-hidden flex flex-col items-center justify-center`}>
      <div className=" absolute top-9 left-2 w-full">
        <Header label="" />
      </div>
      <div className="h-screen w-full">
        <VoiceRecorder />
      </div>
      <WaveAnimation />
    </div>
  );
}
