'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AddIcon from '@/asset/Svg/plusCircle.svg';
import Calendar from '@/components/Calendar/Calendar';
import Navbar from '@/components/Navbar';
import DiaryItem from '@/components/Calendar/DiaryItem';

export default function CalendarPage() {
  const todayTrainings = ['호흡 연습', '그라운딩', '안정화 기법'];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todayRecord, setTodayRecord] = useState<{ diaryEntry: string | null; selectedIcons: string[] | null }>({
    diaryEntry: null,
    selectedIcons: null,
  });
  const router = useRouter();

  // 오늘 날짜를 기본으로 설정
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, [selectedDate]);

  // 선택된 날짜 변경 시 로컬 스토리지에서 해당 날짜의 기록 가져오기
  useEffect(() => {
    if (selectedDate) {
      const dateKey = `dailyRecord-${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
      const storedRecord = localStorage.getItem(dateKey);
      if (storedRecord) {
        const parsedRecord = JSON.parse(storedRecord);
        setTodayRecord({
          diaryEntry: parsedRecord.diaryEntry,
          selectedIcons: parsedRecord.selectedIcons,
        });
        console.log('Record found:', parsedRecord);
      } else {
        setTodayRecord({ diaryEntry: null, selectedIcons: null });
        console.log('No record found for:', dateKey);
      }
    }
  }, [selectedDate]);

  // 선택된 날짜와 요일 추출
  const displayDate = selectedDate || new Date();
  const selectedDay = ['일', '월', '화', '수', '목', '금', '토'][displayDate.getDay()];

  const handleAddRecord = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth() + 1;
    const day = displayDate.getDate();

    // /calendar/dailyRecord 경로에 년, 월, 일을 쿼리 파라미터로 전달
    router.push(`/calendar/dailyRecord?year=${year}&month=${month}&day=${day}`);
  };

  return (
    <div className="pb-32">
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      {/* 공황 일지 박스 */}
      <div className="bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-4 flex">
        {/* 왼쪽: 날짜와 오늘 한 훈련 목록 */}
        <div className="flex flex-col items-center mr-4 font-nanumBold text-gray5">
          <div className="bg-main3 rounded-2xl p-2 text-center text-xxs w-15 h-5 text-nowrap flex items-center justify-center">
            <div>
              {displayDate.getDate()} {selectedDay}
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

        {/* 오른쪽: 기록 메시지 또는 기록 내용 */}
        <div className="flex flex-col items-center justify-center text-main1 font-nanumBold w-48">
          {todayRecord.diaryEntry || todayRecord.selectedIcons ? (
            <>
              <div>
                {todayRecord.selectedIcons && (
                  <div className="flex gap-2">
                    {todayRecord.selectedIcons.map((icon, index) => (
                      <span key={index}>
                        <DiaryItem label={icon} />
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {todayRecord.diaryEntry && <p className="w-36 mt-4 text-black text-sm">{todayRecord.diaryEntry}</p>}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm mb-5">오늘 하루를 기록 하시겠어요?</p>
              <AddIcon onClick={handleAddRecord} />
            </>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
