import Hill from '@/asset/Svg/hill.svg';
import VideoSelector from '@/components/Training/VideoSelector';

export default function CalmDownTrainingPage() {
  return (
    <section className="absolute inset-0 background1 flex justify-center overflow-hidden text-white">
      <div className="absolute bottom-0 w-full">
        <Hill />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-hakgyoansimR mt-32 mb-6">
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
