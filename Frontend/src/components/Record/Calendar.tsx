'use client';
import { addMonths, format, isSameDay, isSameMonth, isToday, setMonth, setYear, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import CalendarListIcon from '@/asset/Svg/calendarListIcon.svg';
import GreenSomi from '@/asset/Svg/greenSomi.svg';
import OrangeSomi from '@/asset/Svg/orangeSomi.svg';
import YellowSomi from '@/asset/Svg/yellowSomi.svg';

import CalendarModal from './CalendarModal';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  isPanicList: string[];
  isTrainingList: { date: string; trainingCount: number }[]; // 날짜별 isTraining 값을 리스트로 전달
}

export default function Calendar({ selectedDate, onDateSelect, isPanicList, isTrainingList }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModal, setIsModal] = useState(false);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const blankDays = Array.from({ length: startOfMonth.getDay() }, () => '');
  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    const nextMonthDate = addMonths(currentDate, 1);
    if (isSameMonth(nextMonthDate, new Date()) || nextMonthDate < new Date()) {
      setCurrentDate(nextMonthDate);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNextMonth,
    onSwipedRight: handlePreviousMonth,
    trackMouse: true,
  });

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleYearChange = (newYear: number) => {
    setCurrentDate(prevDate => setYear(prevDate, newYear));
  };

  const handleMonthChange = (newMonth: number) => {
    setCurrentDate(prevDate => setMonth(prevDate, newMonth - 1));
    setIsModal(false);
  };

  // DdaSomi 아이콘 조건부 렌더링 함수
  const renderSomiIcon = (trainingCount: number) => {
    switch (trainingCount) {
      case 1:
        return <YellowSomi className="w-10 h-10 mt-2" />;
      case 2:
        return <OrangeSomi className="w-10 h-10 mt-2" />;
      case 3:
        return <GreenSomi className="w-10 h-8 ml-1 mb-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto" {...handlers}>
      <div className="flex justify-between items-center mb-6 px-3">
        <div className="text-left" onClick={handleOpenModal}>
          <p className="text-lg font-hakgyoansimR">{format(currentDate, 'yyyy년', { locale: ko })}</p>
          <p className="text-3xl font-hakgyoansimR">
            {format(currentDate, 'MM월', { locale: ko })}
            <button className="ml-3">
              <CalendarListIcon className="mb-1" />
            </button>
          </p>
        </div>
        <div className="flex space-x-4 text-lg font-hakgyoansimR">
          <Link href="/record/selfDiagnosis">
            <button>자가진단</button>
          </Link>
          <Link href="/record/report">
            <button>리포트</button>
          </Link>
        </div>
      </div>

      {isModal && (
        <CalendarModal
          year={currentDate.getFullYear()}
          month={currentDate.getMonth() + 1}
          onClose={() => setIsModal(false)}
          onYearChange={handleYearChange}
          onMonthSelect={handleMonthChange}
        />
      )}

      <div className="grid grid-cols-7 text-center font-hakgyoansimR mb-3">
        {daysOfWeek.map(day => (
          <div key={day} className="text-2xl">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-4">
        {blankDays.map((_, idx) => (
          <div key={idx} className="text-center">
            {' '}
          </div>
        ))}
        {daysInMonth.map(day => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isTodayDate = isToday(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const dateString = format(date, 'yyyy-MM-dd');
          const isPanicDay = isPanicList.includes(dateString);

          // 날짜에 해당하는 isTraining 값을 찾기
          const trainingData = isTrainingList?.find(item => item.date === dateString);
          const trainingCount = trainingData ? trainingData.trainingCount : 0;

          return (
            <div key={day} className="flex flex-col items-center text-gray5">
              <div
                onClick={() => date <= new Date() && onDateSelect(date)}
                className={`relative h-11 w-11 flex items-center justify-center rounded-full cursor-pointer ${
                  isPanicDay ? 'bg-black' : 'bg-gray3'
                }`}>
                {/* isTraining 값에 따라 캐릭터 아이콘 즉시 렌더링 */}
                {trainingCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {renderSomiIcon(trainingCount)}
                  </div>
                )}
              </div>
              <span
                className={`text-sm mt-2 font-hakgyoansimR w-8 rounded-xl text-center ${
                  isSelected ? 'bg-main1 text-gray1' : isTodayDate ? 'bg-indigo-300 text-white' : ''
                }`}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
