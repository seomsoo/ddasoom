// Character Component
'use client';

import Level3 from '@/svgs/Ddasomiz/LV3.svg';
import Babysomi from '@/videos/BabySomi.gif';
import Lv2 from '@/videos/Lv2Somi.gif';
interface LevelProps {
  level: number;
}
export default function Character({ level }: LevelProps) {
  const getCharacterSvg = () => {
    switch (level) {
      case 1:
        return (
          <img
            src={Babysomi.src}
            className="w-24 h-28  transition-opacity duration-300 ease-in-out opacity-100 animate-grow"
            alt="LV1 GIF"
          />
        );
      case 2:
        return (
          <img
            src={Lv2.src}
            className="w-24 h-28  transition-opacity duration-300 ease-in-out opacity-100 animate-grow"
            alt="LV1 GIF"
          />
        );
      case 3:
        return <Level3 />;
      default:
        return null;
    }
  };

  const getBalloonText = () => {
    switch (level) {
      case 1:
        return '응애';
      case 2:
        return '안녕 오늘은 기분은 어떄?!';
      case 3:
        return '슈퍼 따소미 등장!!';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* 말풍선 */}
      <div className="absolute bg-gray1 p-4 rounded-2xl shadow-md text-center text-sm max-w-72 top-64">
        <span>{getBalloonText()}</span>
        {/* 말풍선 꼬리 */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 bg-gray1 rotate-45 " />
      </div>

      {/* 캐릭터 */}
      {getCharacterSvg()}
    </div>
  );
}
