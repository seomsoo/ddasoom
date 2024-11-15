'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestTokenFromApp } from '@/api/axiosInstance';
import { getCharacterData } from '@/api/mainAPI';
import queryKeys from '@/api/querykeys';
import ErrorModal from '@/components/Common/ErrorModal';
import Navbar from '@/components/Common/Navbar';
import Character from '@/components/Main/main/Character';
import Interaction from '@/components/Main/main/interaction';
import LevelBar from '@/components/Main/main/LevelBar';
import Watch from '@/components/Main/main/Watch';
import Window from '@/components/Main/main/Window';
import EmergencyContent from '@/components/Main/Setting/modal/EmergencyContent';
import EmergencyModal from '@/components/Main/Setting/modal/EmergencyModal';
import HelpContent from '@/components/Main/Setting/modal/HelpContent';
import HelpModal from '@/components/Main/Setting/modal/HelpModal';
import MissionContent from '@/components/Main/Setting/modal/MissionContent';
import MissionModal from '@/components/Main/Setting/modal/MissionModal';
import { RootState } from '@/store';
import { setAuthData } from '@/store/authSlice';
import Bed from '@/svgs/bed.svg';
import Bookcase from '@/svgs/bookcase.svg';
import Setting from '@/svgs/setting.svg';
import SoundOn from '@/svgs/soundOn.svg';

export default function WithDdasomi() {
  const { token, userId, userName } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');
  const [currentInteractionGif, setCurrentInteractionGif] = useState<string | null>(null);

  // 캐릭터 데이터를 불러오는 useQuery
  const {
    data: characterData,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.MAIN, userId],
    queryFn: () => getCharacterData(Number(userId)),
    retry: false,
  });

  const ddasomiData = characterData?.data;

  useEffect(() => {
    if (userId && token) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.MAIN, userId] });
    }
  }, [ddasomiData, queryClient, userId, token]);

  useEffect(() => {
    if (isError && error) {
      setErrorContext(error instanceof Error ? error.message : '에러 메시지 읽기 실패');
      setIsErrorModalOpen(true);
    }
  }, [isError, error]);

  const handleRetry = async () => {
    refetch();
    setIsErrorModalOpen(false);

    try {
      const newToken = await requestTokenFromApp();
      dispatch(
        setAuthData({
          token: newToken,
          userName: userName,
          userId: userId,
        }),
      );
      queryClient.invalidateQueries({ queryKey: [queryKeys.MAIN, userId] });
    } catch (error) {
      console.error('새로운 토큰 요청 실패:', error);
      setErrorContext('토큰 갱신에 실패했습니다.');
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className="bg-[#C7C0B3] h-screen -m-4">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}
      <header className="flex flex-col w-full h-72 bg-main4 p-6 border-b-8">
        <article className="flex justify-between w-full">
          <LevelBar level={ddasomiData?.level ?? 0} experiencePercent={ddasomiData?.experiencePercent ?? 0} />
          <EmergencyModal ContentComponent={EmergencyContent} />
        </article>

        <div className="flex justify-between">
          <div className="mt-8 ml-7">
            <Window />
          </div>
          <div className="mt-8 mr-14">
            <Watch />
          </div>
          <div className="absolute gap-6 right-6 top-40 z-10 flex flex-col">
            <HelpModal ContentComponent={HelpContent} />
            <Link href="/main/setting">
              <Setting />
            </Link>
            <SoundOn />
            <MissionModal ContentComponent={MissionContent} />
          </div>
        </div>
      </header>

      <main className="flex flex-col bg-[#D8D1C3] items-center h-48">
        <div className="absolute left-7 top-56">
          <Bed />
        </div>
        <div className="absolute right-16 z-0 top-52">
          <Bookcase />
        </div>
        <div>
          <Character level={ddasomiData?.level ?? 1} currentInteractionGif={currentInteractionGif} />
        </div>
      </main>
      <section className="flex flex-col p-3">
        <Interaction
          level={ddasomiData?.level ?? 1}
          continuousTrainingDays={ddasomiData?.continuousTrainingDays ?? 0}
          strokeCount={ddasomiData?.strokeCount ?? 0}
          hugCount={ddasomiData?.hugCount ?? 0}
          playCount={ddasomiData?.playCount ?? 0}
          onInteractionStart={setCurrentInteractionGif}
        />
      </section>
      <Navbar />
    </div>
  );
}
