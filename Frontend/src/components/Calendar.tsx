'use client';
import { addMonths, format, isToday, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // 시작 요일을 맞추기 위해 이전 달의 날짜들을 빈 칸으로 표시
  const blankDays = Array.from({ length: startOfMonth.getDay() }, () => '');

  // 이번 달의 날짜들을 배열에 추가
  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => i + 1,
  );

  // 이전 달로 이동
  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // 슬라이드 제스처를 위한 설정
  const handlers = useSwipeable({
    onSwipedLeft: handleNextMonth,
    onSwipedRight: handlePreviousMonth,
    trackMouse: true,
  });

  return (
    <div className="w-full mx-auto" {...handlers}>
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="text-left">
          <p className="text-lg font-hakgyoansimR">{format(currentDate, 'yyyy년', { locale: ko })}</p>
          <p className="text-3xl font-hakgyoansimR">{format(currentDate, 'MM월', { locale: ko })}</p>
        </div>
        <div className="flex space-x-4">
          <button className="text-lg font-hakgyoansimR">자가진단</button>
          <button className="text-lg font-hakgyoansimR">리포트</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center font-hakgyoansimR mb-3 ">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-2xl">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-4">
        {blankDays.map((_, idx) => (
          <div key={idx} className="text-center"> </div>
        ))}
        {daysInMonth.map((day) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isTodayDate = isToday(date);

          return (
            <div key={day} className="flex flex-col items-center text-gray5">
              <div
                className={'h-11 w-11 flex items-center justify-center rounded-full bg-gray3'}
              />
              <span className={`text-sm mt-2 font-hakgyoansimR ${isTodayDate && 'bg-main1 w-8 rounded-xl text-center text-gray1' }`}>
                {format(date, 'd')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
