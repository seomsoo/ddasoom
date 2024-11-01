import background from '@/components/BackGround/Background.module.css';
import WaveAnimation from '@/components/BackGround/WaveAnimation';
import RecordButton from '@/components/Main/RecordButton';

export default function VoiceRecordingPage() {
  return (
    <div className={`${background.background3} fixed inset-0 overflow-hidden`}>
      <RecordButton />
      <WaveAnimation />
    </div>
  );
}
