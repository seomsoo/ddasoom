import AlcoholSvg from '@/asset/Svg/DiaryAlcohol.svg';
import CaffeineSvg from '@/asset/Svg/DiaryCaffeine.svg';
import CigaretteSvg from '@/asset/Svg/DiaryCigarette.svg';
import ExerciseSvg from '@/asset/Svg/DiaryExercise.svg';

interface RecordItemProps {
  labels: string[] | null;
}

export default function DiaryItem({ labels = [] }: RecordItemProps) {
  // label에 따라 아이콘을 매핑하는 객체 생성
  const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    caffeine: CaffeineSvg,
    cigarette: CigaretteSvg,
    alcohol: AlcoholSvg,
    exercise: ExerciseSvg,
  };

  // 특정 label에 배경색을 적용하는 함수
  const getBgColor = (key: string) => {
    return key === 'caffeine' ? 'bg-sub2' : key === 'cigarette' ? 'bg-sub3' : key === 'alcohol' ? 'bg-sub4' : 'bg-sub5';
  };
  console.log(labels);
  return (
    <div className="flex gap-3">
      {Object.entries(iconMap).map(([key, Icon]) => (
        <div
          key={key}
          className={`flex justify-center items-center rounded-full shadow-md w-11 h-11 ${
            labels?.includes(key) ? getBgColor(key) : 'bg-gray1'
          }`}>
          <Icon className={`${labels?.includes(key) ? 'text-main4' : 'text-gray4'}`} />
        </div>
      ))}
    </div>
  );
}
