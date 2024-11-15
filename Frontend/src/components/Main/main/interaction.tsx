// Interaction Component
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { putInteractionData } from '@/api/mainAPI';
import queryKeys from '@/api/querykeys';
import ErrorModal from '@/components/Common/ErrorModal';
import useAuth from '@/hooks/useGetToken';
import Play from '@/svgs/Ddasomiz/blueDdasom.svg';
import Stroke from '@/svgs/Ddasomiz/greenSomi.svg';
import Hug from '@/svgs/Ddasomiz/yellowSomi.svg';
import Lv1Hug from '@/videos/LV1Hug.gif';
import Lv1Play from '@/videos/LV1Play.gif';
import Lv1Stroke from '@/videos/LV1Stroke.gif';
import Lv2Hug from '@/videos/LV2Hug.gif';
import Lv2Play from '@/videos/LV2Play.gif';
import Lv2Stroke from '@/videos/LV2Stroke.gif';
import Lv3Hug from '@/videos/LV3Hug.gif';
import Lv3Play from '@/videos/LV3Play.gif';
import Lv3Stroke from '@/videos/LV3Stroke.gif';

type IconComponentType = React.FC<{ className?: string }>;
interface InteractionProps {
  level: number;
  continuousTrainingDays: number;
  strokeCount: number;
  hugCount: number;
  playCount: number;
  onInteractionStart: (gif: string | null) => void;
  onInteractionType: (type: 'PLAY' | 'STROKE' | 'HUG') => void;
}

export default function Interaction({
  level,
  continuousTrainingDays,
  strokeCount,
  hugCount,
  playCount,
  onInteractionStart,
  onInteractionType,
}: InteractionProps) {
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');
  const [isInProgress, setIsInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [SelectedIcon, setSelectedIcon] = useState<IconComponentType | null>(null);
  const [lastInteraction, setLastInteraction] = useState<{
    IconComponent: IconComponentType;
    interactionType: 'PLAY' | 'STROKE' | 'HUG';
  } | null>(null);
  useAuth();

  const interactionMutation = useMutation({
    mutationFn: (data: { interactionType: 'PLAY' | 'STROKE' | 'HUG' }) => putInteractionData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.MAIN] });
    },
    onError: error => {
      console.error('상호작용 전송 실패:', error);
      setErrorContext(error.message || '에러 메시지 전송 안 됨');
      setIsErrorModalOpen(true);
    },
  });

  const getInteractionGif = (type: 'PLAY' | 'STROKE' | 'HUG'): string | null => {
    if (level === 1) {
      if (type === 'HUG') return Lv1Hug.src;
      if (type === 'PLAY') return Lv1Play.src;
      if (type === 'STROKE') return Lv1Stroke.src;
    } else if (level === 2) {
      if (type === 'HUG') return Lv2Hug.src;
      if (type === 'PLAY') return Lv2Play.src;
      if (type === 'STROKE') return Lv2Stroke.src;
    } else {
      if (type === 'HUG') return Lv3Hug.src;
      if (type === 'PLAY') return Lv3Play.src;
      if (type === 'STROKE') return Lv3Stroke.src;
    }
    return null;
  };

  const handleButtonClick = (IconComponent: IconComponentType, interactionType: 'PLAY' | 'STROKE' | 'HUG') => {
    const interactionGif = getInteractionGif(interactionType);
    if (interactionGif) {
      onInteractionStart(interactionGif); // 상호작용 GIF 시작
      onInteractionType(interactionType);
    }
    setIsInProgress(true);
    setSelectedIcon(() => IconComponent);
    setProgress(0);
    setLastInteraction({ IconComponent, interactionType });
    interactionMutation.mutate({ interactionType });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInProgress(false);
          onInteractionStart(null); // 상호작용이 끝나면 기본 캐릭터로 전환
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const getTextColor = () => {
    if (continuousTrainingDays <= 3) return 'text-[#ffde84]';
    if (continuousTrainingDays <= 7) return 'text-[#7caeff]';
    return 'text-[#FF4E4E]';
  };

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    queryClient.invalidateQueries({ queryKey: [queryKeys.MAIN] });
    if (lastInteraction) {
      handleButtonClick(lastInteraction.IconComponent, lastInteraction.interactionType);
    }
  };

  return (
    <>
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
      <div className="mb-2">
        <span className="font-hakgyoansimR items-baseline text-xl flex text-gray1">
          연속 <p className={`ml-1 font-hakgyoansimB ${getTextColor()}`}>{continuousTrainingDays}일</p>째 훈련 중 🔥
        </span>
      </div>

      <div className="bg-white h-40 rounded-3xl items-center justify-center gap-3 flex shadow-xl">
        {isInProgress ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-4/5 h-2 bg-gradient-to-r from-[#e0f7e4] to-[#66eb58] rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="absolute top-10 flex items-center space-x-2">
              {SelectedIcon && <SelectedIcon className="w-8 h-8" />}
              <span className="text-sm text-gray5 font-hakgyoansimB">{progress}%</span>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => handleButtonClick(Hug, 'HUG')}
              disabled={hugCount === 0}
              className={`bg-[#ffde84] flex flex-col justify-end rounded-2xl w-[105px] h-32 shadow-lg transform transition duration-100 active:translate-y-1 active:shadow-none ${
                hugCount === 0 ? 'opacity-85 cursor-not-allowed' : ''
              }`}>
              <div className="relative bg-[#ffffe4] rounded-xl text-center h-24 flex w-full flex-col justify-center">
                <div className="absolute -top-5 left-7">
                  <Hug />
                </div>
                <span className="font-hakgyoansimR text-xl w-full">안아주기</span>
                <span className="text-gray5 text-xs mt-1">{hugCount}개 보유</span>
              </div>
            </button>

            <button
              onClick={() => handleButtonClick(Play, 'PLAY')}
              disabled={playCount === 0}
              className={`bg-[#7caeff] flex flex-col justify-end rounded-2xl w-[105px] h-32 shadow-lg transform transition duration-100 active:translate-y-1 active:shadow-none ${
                playCount === 0 ? 'opacity-85 cursor-not-allowed' : ''
              }`}>
              <div className="relative w-full bg-[#f3f8ff] rounded-xl text-center h-24 flex flex-col justify-center">
                <div className="absolute -top-5 left-7">
                  <Play />
                </div>
                <span className="font-hakgyoansimR text-xl w-full">놀아주기</span>
                <span className="text-gray5 text-xs mt-1">{playCount}개 보유</span>
              </div>
            </button>

            <button
              onClick={() => handleButtonClick(Stroke, 'STROKE')}
              disabled={strokeCount === 0}
              className={`bg-[#30cc81] flex flex-col justify-end rounded-2xl w-[105px] h-32 shadow-lg transform transition duration-100 active:translate-y-1 active:shadow-none ${
                strokeCount === 0 ? 'opacity-85 cursor-not-allowed' : ''
              }`}>
              <div className="relative w-full bg-[#dcffee] rounded-2xl text-center h-24 flex flex-col justify-center">
                <div className="absolute -top-5 left-7">
                  <Stroke />
                </div>
                <span className="font-hakgyoansimR text-xl w-full">쓰다듬기</span>
                <span className="text-gray5 text-xs mt-1">{strokeCount}개 보유</span>
              </div>
            </button>
          </>
        )}
      </div>
    </>
  );
}
