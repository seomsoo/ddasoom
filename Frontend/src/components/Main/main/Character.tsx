// Character Component
'use client';

import Level3 from '@/svgs/Ddasomiz/LV3.svg';
import Babysomi from '@/videos/BabySomi.gif';
import Lv2 from '@/videos/Lv2Somi.gif';

interface LevelProps {
  level: number;
  currentInteractionGif: string | null;
}

export default function Character({ level, currentInteractionGif }: LevelProps) {
  const getCharacterSvg = () => {
    // 상호작용 GIF가 있을 경우 우선 표시
    if (currentInteractionGif) {
      if (level === 2) {
        return <img src={currentInteractionGif} className="w-32 h-36" alt="Interaction GIF" />;
      }
      return <img src={currentInteractionGif} className="w-28 h-32" alt="Interaction GIF" />;
    }

    // 기본 캐릭터 표시
    if (level === 1) {
      return <img src={Babysomi.src} className="w-28 h-32" alt="Level 1 Character" />;
    }
    if (level === 2) {
      return <img src={Lv2.src} className="w-32 h-36" alt="Level 2 Character" />;
    }
    if (level === 3) {
      return <Level3 />;
    }
    return null;
  };

  const getBalloonText = () => {
    if (level === 1) return '응애';
    if (level === 2) return '안녕 오늘은 기분은 어떄?!';
    if (level === 3) return '슈퍼 따소미 등장!!';
    return '';
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="absolute bg-gray1 p-4 rounded-2xl shadow-md text-center text-sm max-w-72 top-64">
        <span>{getBalloonText()}</span>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 bg-gray1 rotate-45 " />
      </div>
      {getCharacterSvg()}
    </div>
  );
}
