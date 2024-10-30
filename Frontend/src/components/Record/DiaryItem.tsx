import AlcoholSvg from '@/asset/Svg/DiaryAlcohol.svg';
import CaffeineSvg from '@/asset/Svg/DiaryCaffeine.svg';
import CigaretteSvg from '@/asset/Svg/DiaryCigarette.svg';
import ExerciseSvg from '@/asset/Svg/DiaryExercise.svg';

interface RecordItemProps {
  label: string;
}

export default function DiaryItem({ label }: RecordItemProps) {
  // label에 따라 아이콘을 매핑하는 객체 생성
  const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    caffeine: CaffeineSvg,
    cigarette: CigaretteSvg,
    alcohol: AlcoholSvg,
    exercise: ExerciseSvg,
  };

  // label 값에 해당하는 아이콘을 가져옴
  const Icon = iconMap[label];

  // label에 따라 배경색을 설정
  const bgColor =
    label === 'caffeine' ? 'bg-sub2' : label === 'cigarette' ? 'bg-sub3' : label === 'alcohol' ? 'bg-sub4' : 'bg-sub5';

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex flex-grow justify-center items-start rounded-full  shadow-[0px_6px_10px_rgba(0,0,0,0.25)] w-11 h-11 ${bgColor}`}>
        {Icon && <Icon className="text-white w-12 h-12 my-2 mx-2" />}
      </div>
    </div>
  );
}
