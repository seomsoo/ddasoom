import Ddasomi from '@/asset/Svg/ddasomi.svg';
import Header from '@/components/Header';
import BreathCircle from '@/components/Training/Breath/BreathCircle';

const BreatTrainingPage = () => {
  return (
    <div>
      <Header label="호흡하기" />
      <div className="flex flex-col justify-center items-center">
        <BreathCircle timing="basicTime" />
        <Ddasomi className="absolute" />
      </div>
    </div>
  );
};

export default BreatTrainingPage;
