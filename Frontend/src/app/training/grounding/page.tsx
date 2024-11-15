import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Common/Header';
import MainContent from '@/components/Training/Grounding/MainContent';
export default function GroundingTrainingPage() {
  return (
    <div className={`${background.background6} overflow-hidden h-full inset-0 px-4  pt-4 absolute`}>
      <Header label="그라운딩" />
      <MainContent />
    </div>
  );
}
