import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Common/Header';
import BreathSelector from '@/components/Training/Breath/BreathSelector';
import Backcloud from '@/svgs/backcloud.svg';
export default function BreathTrainingPage() {
  return (
    <section className={`${background.background4} absolute inset-0  flex justify-center overflow-hidden text-white`}>
      <div className="absolute top-9 left-2 w-full">
        <Header label="" />
      </div>
      <div className="absolute bottom-0 w-full">
        <Backcloud />
      </div>
      <main>
        <h1 className="text-4xl font-hakgyoansimR mt-24 mb-5">
          따솜이와 함께 <br />
          호흡에 집중해볼까요?
        </h1>
        <div className="flex items-center justify-center ">
          <BreathSelector />
        </div>
      </main>
    </section>
  );
}
