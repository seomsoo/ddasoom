'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import DiaryItem from '@/components/Record/Calendar/DiaryItem';
import GreenSomi from '@/svgs/greenSomi.svg';
import HerongSomi from '@/svgs/herongSomi.svg';
import OrangeSomi from '@/svgs/orangeSomi.svg';
import AddIcon from '@/svgs/plusCircle.svg';
import Seed from '@/svgs/seedling.svg';
import YellowSomi from '@/svgs/yellowSomi.svg';

interface TodayRecordProps {
  training: { date: string; trainingList: string[] } | null;
  date: Date;
  record: { date: string | null; description: string | null; selectedIcons: string[] | null };
}
export default function TodayRecord({ training, date, record }: TodayRecordProps) {
  const router = useRouter();
  const selectedDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  /* eslint-disable indent */
  // 훈련 기록에 따른 따소미 캐릭터
  // ESLint 규칙에 따라 들여쓰기 8칸은 오류
  // 이 코드에서만 규칙 비활성화
  const renderSomiIcon = () => {
    switch (training?.trainingList.length) {
      case 1:
        return <YellowSomi className="mb-2" />;
      case 2:
        return <OrangeSomi className="mb-2" />;
      case 3:
        return <GreenSomi className="mb-2" />;
      default:
        return <HerongSomi className="mb-2" />;
    }
  };
  /* eslint-enable indent */

  const handleAddRecord = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    router.push(`/record/dailyRecord?year=${year}&month=${month}&day=${day}`);
  };
  console.log('record:', record);

  return (
    <div className="relative bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-5 min-h-60 flex">
      <Seed className="absolute -top-4 left-3" />
      {/* 훈련 기록 */}
      <div className="flex flex-col items-center mr-3 font-nanumBold min-w-16 text-gray5">
        {renderSomiIcon()}
        <div className="bg-main3 rounded-2xl p-2 text-center text-xxs w-15 h-5 text-nowrap flex items-center justify-center">
          <div>
            {date.getDate()} {selectedDay}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 font-nanumBold text-gray5 text-center text-xxs text-nowrap">
          오늘 한 훈련
          {training?.trainingList.map((trainingContext, index) => (
            <div key={index} className="bg-gray2 rounded-full px-2 py-2">
              {trainingContext}
            </div>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-l border-gray3 mr-3" />

      {/* 데일리 기록 */}
      <div className="flex flex-col text-main1 font-nanumBold w-full ">
        {record.description || record.selectedIcons ? (
          <>
            <div className="flex justify-center">
              <DiaryItem labels={record.selectedIcons} />
            </div>
            <div className="mt-6 text-black text-sm">
              {record.description ? (
                <p className="w-full break-words px-2">{record.description}</p>
              ) : (
                <p className="text-center">오늘의 한 줄 일기가 없습니다.</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-16">
            <p className="text-sm mb-5">오늘 하루를 기록 하시겠어요?</p>
            <AddIcon onClick={handleAddRecord} className="cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
}
