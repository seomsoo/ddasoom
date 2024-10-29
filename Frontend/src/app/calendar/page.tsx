'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AddIcon from '@/asset/Svg/plusCircle.svg';
import Calendar from '@/components/Calendar/Calendar';
import Navbar from '@/components/Navbar';

export default function CalendarPage() {
  const todayTrainings = ['호흡 연습', '그라운딩', '안정화 기법'];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();
  // 컴포넌트가 처음 렌더링될 때 오늘 날짜를 기본으로 설정
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, [selectedDate]);

  // 선택된 날짜와 요일 추출
  const displayDate = selectedDate || new Date(); // 선택된 날짜가 없으면 오늘 날짜 사용
  const selectedDay = ['일', '월', '화', '수', '목', '금', '토'][displayDate.getDay()];

  const handleAddRecord = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = displayDate.getDate();

    // /calendar/dailyRecord 경로에 년, 월, 일을 쿼리 파라미터로 전달
    router.push(`/calendar/dailyRecord?year=${year}&month=${month}&day=${day}`);
  };
  return (
    <div className="pb-32">
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      {/* 공황 일지 박스 */}
      <div className="bg-main4  rounded-2xl border border-main1 p-4 shadow-sm mt-4 flex">
        {/* 왼쪽: 날짜와 오늘 한 훈련 목록 */}
        <div className="flex flex-col items-center mr-6 font-nanumBold text-gray5 ">
          <div className="bg-main3 rounded-2xl p-2 text-center text-xxs w-15 h-5 text-nowrap flex items-center justify-center">
            <div>
              <div>
                {displayDate.getDate()} {selectedDay}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 font-nanumBold text-gray5 text-center text-xxs">
            오늘 한 훈련
            {todayTrainings.map((training, index) => (
              <div key={index} className="bg-gray2 rounded-full px-2 py-1">
                {training}
              </div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-l border-gray3 mr-4" />

        {/* 오른쪽: 기록 메시지 */}
        <div className="flex flex-col items-center justify-center text-center text-main1 font-nanumBold">
          <p className="font-semibold mb-2">오늘 하루를 기록 하시겠어요?</p>
          <AddIcon onClick={handleAddRecord} />
        </div>
      </div>

      <Navbar />
    </div>
  );
}
