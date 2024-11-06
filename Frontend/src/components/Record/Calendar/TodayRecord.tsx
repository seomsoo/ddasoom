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

interface TrainingRecord {
  date: string;
  trainingList: string[];
}

interface DailyRecord {
  alcohol: boolean;
  caffeine: boolean;
  smoking: boolean;
  exercise: boolean;
  description: string | null;
}

interface TodayRecordProps {
  training: TrainingRecord | null;
  date: Date;
  record: DailyRecord;
}

export default function TodayRecord({ training, date, record }: TodayRecordProps) {
  const router = useRouter();
  const selectedDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  const handleAddRecord = () => {
    router.push(`/record/dailyRecord?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`);
  };

  const renderSomiIcon = () => {
    const somiIcons = [HerongSomi, YellowSomi, OrangeSomi, GreenSomi];
    const Icon = somiIcons[Math.min(training?.trainingList.length || 0, 3)];
    return <Icon className="mb-2" />;
  };

  const getTrainingLabel = (label: string) => {
    switch (label) {
      case 'GROUNDING':
        return '그라운딩';
      case 'COMEDOWN':
        return '안정화기법';
      case 'BREATH':
        return '호흡연습';
      default:
        return label;
    }
  };

  // record 객체에서 true인 항목만 label로 변환
  const labels = [
    record.alcohol && 'alcohol',
    record.caffeine && 'caffeine',
    record.smoking && 'cigarette',
    record.exercise && 'exercise',
  ].filter(Boolean) as string[];

  return (
    <div className="relative bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-10 min-h-60 flex">
      <Seed className="absolute -top-4 left-3" />
      <div className="flex flex-col items-center mr-3 font-nanumBold min-w-16 text-gray5">
        {renderSomiIcon()}
        <div className="bg-main3 rounded-2xl p-2 text-center text-xxs w-15 h-5 text-nowrap flex items-center justify-center">
          {date.getDate()} {selectedDay}
        </div>
        <div className="flex flex-col gap-2 mt-4 font-nanumBold text-gray5 text-center text-xxs text-nowrap">
          오늘 한 훈련
          {training?.trainingList.map((item, index) => (
            <div key={index} className="bg-gray2 rounded-full px-2 py-2">
              {getTrainingLabel(item)}
            </div>
          ))}
        </div>
      </div>

      <div className="border-l border-gray3 mr-3" />

      <div className="flex flex-col text-main1 font-nanumBold w-full ">
        {record.description || labels.length > 0 ? (
          <>
            <div className="flex justify-center">
              <DiaryItem labels={labels} />
            </div>
            <div className="mt-6 text-black text-sm">
              <p className="w-full break-words px-2">{record.description || '오늘의 한 줄 일기가 없습니다.'}</p>
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
