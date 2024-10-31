import Ddasomi from '@/asset/Svg/shadowDdasomi.svg';
import Header from '@/components/Header';
import BreathCircle from '@/components/Training/Breath/BreathCircle';

const BreatTrainingPage = () => {
  return (
    <div>
      <Header label="호흡하기" />
      <div className="flex flex-col justify-center items-center">
        <BreathCircle timing="basicTime" />
        <Ddasomi className="absolute w-48 h-48" />
      </div>
    </div>
  );
};

export default BreatTrainingPage;
