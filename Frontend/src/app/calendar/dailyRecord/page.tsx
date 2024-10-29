'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import CaffeineSvg from '@/asset/Svg/caffeine.svg';
import Header from '@/components/Header';

export default function DailyRecordPage() {
  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 year, month, day 가져오기
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  // 선택된 날짜 label
  const label = year && month && day ? `${year}년 ${month}월 ${day}일` : '';

  // 각 아이콘의 선택 상태를 관리하는 객체
  const [selectedIcons, setSelectedIcons] = useState<{ [key: string]: boolean }>({
    caffeine: false,
    // 추가 아이콘 상태 초기화
  });

  // 아이콘 클릭 핸들러
  const handleIconClick = (iconId: string) => {
    setSelectedIcons(prevSelected => ({
      ...prevSelected,
      [iconId]: !prevSelected[iconId], // 현재 아이콘의 선택 상태를 토글
    }));
  };

  return (
    <div>
      <Header label={label} />
      <p>오늘 하루 어떤 활동을 하셨나요?</p>

      <div className="flex space-x-4 mt-4">
        {/* 아이콘을 클릭하면 색상이 동적으로 변경됨 */}
        <div onClick={() => handleIconClick('caffeine')} className="cursor-pointer">
          <CaffeineSvg className={`${selectedIcons.caffeine ? 'text-main4' : 'text-gray5'}`} />
        </div>
      </div>
    </div>
  );
}
