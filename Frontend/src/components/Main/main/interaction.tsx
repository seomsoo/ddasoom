'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { putInteractionData } from '@/api/mainAPI';
import queryKeys from '@/api/querykeys';
import ErrorModal from '@/components/Common/ErrorModal';
import Play from '@/svgs/Ddasomiz/blueDdasom.svg';
import Stroke from '@/svgs/Ddasomiz/greenSomi.svg';
import Hug from '@/svgs/Ddasomiz/yellowSomi.svg';

type IconComponentType = React.FC<{ className?: string }>;
interface InteractionProps {
  continuousTrainingDays: number;
  strokeCount: number;
  hugCount: number;
  playCount: number;
}

export default function Interaction({ continuousTrainingDays, strokeCount, hugCount, playCount }: InteractionProps) {
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');
  const [isInProgress, setIsInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [SelectedIcon, setSelectedIcon] = useState<IconComponentType | null>(null);
  const [lastInteraction, setLastInteraction] = useState<{
    IconComponent: IconComponentType;
    interactionType: string;
  } | null>(null);

  const interactionMutation = useMutation({
    mutationFn: (data: { interactionType: string }) => putInteractionData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CHARACTER] });
    },
    onError: error => {
      console.error('상호작용 전송 실패:', error);
      setErrorContext(error.message || '에러 메시지 전송 안 됨');
      setIsErrorModalOpen(true);
    },
  });

  const handleButtonClick = (IconComponent: IconComponentType, interactionType: string) => {
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
