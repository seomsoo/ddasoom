import AlcoholSvg from '@/svgs/alcohol.svg';
import CaffeineSvg from '@/svgs/caffeine.svg';
import CigaretteSvg from '@/svgs/cigarette.svg';
import ExerciseSvg from '@/svgs/exercise.svg';

interface RecordItemProps {
  label: string;
  count: number;
}

// label을 한글 이름으로 매핑하는 객체
const labelNames: { [key: string]: string } = {
  caffeine: '카페인',
  cigarette: '니코틴',
  alcohol: '알코올',
  exercise: '운동',
};

export default function DiaryItem({ label, count }: RecordItemProps) {
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
        className={`flex flex-grow justify-center items-center rounded-full shadow-[0px_6px_10px_rgba(0,0,0,0.25)] w-14 h-14 ${bgColor}`}>
        {Icon && <Icon className="text-white" />}
      </div>
      <span className="text-center text-sm font-nanumBold text-gray-500 mt-2">{labelNames[label]}</span>
      <span className="text-center text-xs text-black mt-1">{count}회</span>
    </div>
  );
}
