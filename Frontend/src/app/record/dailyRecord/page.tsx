'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AlcoholSvg from '@/asset/Svg/alcohol.svg';
import CaffeineSvg from '@/asset/Svg/caffeine.svg';
import CigaretteSvg from '@/asset/Svg/cigarette.svg';
import ExerciseSvg from '@/asset/Svg/exercise.svg';
import Button from '@/components/Button';
import Header from '@/components/Header';
import RecordItem from '@/components/Record/RecordItem';

export default function DailyRecordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 쿼리 파라미터에서 year, month, day 가져오기
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  // 선택된 날짜 label
  const label = year && month && day ? `${year}년 ${month}월 ${day}일` : '';

  // 각 아이콘의 선택 상태를 관리하는 객체
  const [selectedIcons, setSelectedIcons] = useState<{ [key: string]: boolean }>({
    caffeine: false,
    cigarette: false,
    alcohol: false,
    exercise: false,
  });

  // 한 줄 일기 내용
  const [diaryEntry, setDiaryEntry] = useState('');

  // 기록하기 버튼 활성화 여부
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 아이콘 클릭 핸들러
  const handleIconClick = (iconId: string) => {
    setSelectedIcons(prevSelected => ({
      ...prevSelected,
      [iconId]: !prevSelected[iconId], // 현재 아이콘의 선택 상태를 토글
    }));
  };

  // isButtonEnabled 상태 업데이트
  useEffect(() => {
    const isAnyIconSelected = Object.values(selectedIcons).some(selected => selected);
    setIsButtonEnabled(isAnyIconSelected || diaryEntry.trim() !== '');
  }, [selectedIcons, diaryEntry]);

  const handleAddDailyRecord = () => {
    const dateKey = `dailyRecord-${year}-${month}-${day}`;
    const recordData = {
      selectedIcons: Object.keys(selectedIcons).filter(icon => selectedIcons[icon]),
      diaryEntry: diaryEntry.trim(),
    };

    // 날짜별 키로 로컬 스토리지에 저장
    localStorage.setItem(dateKey, JSON.stringify(recordData));
    router.push('/record');
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Header label={label} />
      <p className="font-hakgyoansimR text-2xl">
        오늘 하루 <br />
        어떤 활동을 하셨나요?
      </p>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <RecordItem
          label="카페인"
          Icon={CaffeineSvg}
          isSelected={selectedIcons.caffeine}
          onClick={() => handleIconClick('caffeine')}
        />
        <RecordItem
          label="니코틴"
          Icon={CigaretteSvg}
          isSelected={selectedIcons.cigarette}
          onClick={() => handleIconClick('cigarette')}
        />
        <RecordItem
          label="알코올"
          Icon={AlcoholSvg}
          isSelected={selectedIcons.alcohol}
          onClick={() => handleIconClick('alcohol')}
        />
        <RecordItem
          label="운동"
          Icon={ExerciseSvg}
          isSelected={selectedIcons.exercise}
          onClick={() => handleIconClick('exercise')}
        />
      </div>
      <p className="font-hakgyoansimR text-2xl mt-7">오늘의 한 줄 일기</p>
      <div className="bg-main4 w-full h-60 rounded-xl border border-2 border-main1 p-4">
        <textarea
          placeholder="글을 입력하세요..."
          className="w-full h-full bg-transparent outline-none resize-none"
          value={diaryEntry}
          onChange={e => setDiaryEntry(e.target.value)}
        />
      </div>
      <Button label="기록하기" disabled={!isButtonEnabled} onClick={handleAddDailyRecord} />
    </div>
  );
}
