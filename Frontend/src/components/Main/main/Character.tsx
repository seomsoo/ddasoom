'use client';

import Lv1 from '@/videos/BabySomi.gif';
import Lv2 from '@/videos/Lv2Somi.gif';
import Lv3 from '@/videos/Lv3Somi.gif';

interface LevelProps {
  level: number;
  currentInteractionGif: string | null;
  currentInteractionType: 'PLAY' | 'STROKE' | 'HUG' | null;
}

export default function Character({ level, currentInteractionGif, currentInteractionType }: LevelProps) {
  const getCharacterSvg = () => {
    if (currentInteractionGif) {
      const sizeClasses: Record<'PLAY' | 'STROKE' | 'HUG', string> =
        level === 1
          ? {
              PLAY: 'w-[160px] h-36 ml-1',
              STROKE: 'w-[130px] h-[141px] mr-1',
              HUG: 'w-[130px] h-[150px]',
            }
          : {
              PLAY: 'w-[160px] h-36 mr-2',
              STROKE: 'w-[130px] h-36 mr-3',
              HUG: 'w-32 h-36',
            };
      const sizeClass = currentInteractionType ? sizeClasses[currentInteractionType] : 'w-32 h-36';

      return (
        <img
          src={currentInteractionGif}
          className={`${sizeClass} transition-opacity duration-300 ease-in-out`}
          alt={`${currentInteractionType} GIF`}
        />
      );
    }

    const levelImages = [Lv1, Lv2, Lv3];
    const defaultImage = levelImages[level - 1]?.src || Lv1.src;
    return (
      <img
        src={defaultImage}
        className="w-28 h-32 mt-2 transition-transform duration-300 ease-in-out"
        alt={`Level ${level} Character`}
      />
    );
  };

  const getBalloonText = () => {
    const texts = ['응애', '안녕 오늘 기분은 어때?!', '슈퍼 따소미 등장!!'];
    return texts[level - 1] || '';
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="absolute bg-gray1 p-4 rounded-2xl shadow-md text-center text-sm max-w-72 top-64">
        <span>{getBalloonText()}</span>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 bg-gray1 rotate-45" />
      </div>
      {getCharacterSvg()}
    </div>
  );
}
