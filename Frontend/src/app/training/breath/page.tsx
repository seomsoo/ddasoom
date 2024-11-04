// import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Header';
import BreathSelector from '@/components/Training/Breath/BreathSelector';
// import Hill from '@/svgs/hill.svg';
export default function BreathTrainingPage() {
  return (
    <section className={' absolute inset-0  flex justify-center overflow-hidden'}>
      <div className="absolute top-9 left-2 w-full">
        <Header label="" />
      </div>
      <div className="absolute bottom-0 w-full">
        {/* <Hill /> */}
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-hakgyoansimR mt-24 mb-5">
          1분 동안 <br />
          호흡에 집중해볼까요?
        </h1>
        <div className="flex items-center justify-center ">
          <BreathSelector />
        </div>
      </div>
    </section>
  );
}
