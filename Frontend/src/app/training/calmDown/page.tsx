import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Common/Header';
import VideoSelector from '@/components/Training/CalmDown/VideoSelector';
import Hill from '@/svgs/hill.svg';
export default function CalmDownTrainingPage() {
  return (
    <section className={`${background.background1} absolute inset-0  flex justify-center overflow-hidden text-white`}>
      <div className=" absolute top-9 left-2 w-full">
        <Header label="" />
      </div>
      <div className="absolute bottom-0 w-full">
        <Hill />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-hakgyoansimR mt-24 mb-5">
          마음의 평온을 찾아
          <br /> 떠날 준비가 되셨나요?
        </h1>
        <div className="flex items-center justify-center ">
          <VideoSelector />
        </div>
      </div>
    </section>
  );
}
