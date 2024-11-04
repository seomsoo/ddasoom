import 'swiper/swiper-bundle.css';

import { addMonths, subMonths } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import CalendarModal from './CalendarModal';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  isPanicList: string[];
  isTrainingList: { date: string; trainingCount: number }[];
}

export default function CustomCalendar({
  selectedDate,
  onDateSelect,
  isPanicList,
  isTrainingList,
}: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModal, setIsModal] = useState(false);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate]);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const updateHeight = () => {
    if (swiperContainerRef.current) {
      const activeSlide = swiperContainerRef.current.querySelector('.swiper-slide-active');
      if (activeSlide) {
        swiperContainerRef.current.style.height = `${activeSlide.clientHeight}px`;
      }
    }
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    if (swiperContainerRef.current) {
      const activeSlide = swiperContainerRef.current.querySelector('.swiper-slide-active');
      if (activeSlide) {
        observer.observe(activeSlide);
      }
    }

    return () => observer.disconnect();
  }, [currentDate]);

  return (
    <div className="w-full">
      <CalendarHeader currentDate={currentDate} onOpenModal={handleOpenModal} />
      {isModal && (
        <CalendarModal
          year={currentDate.getFullYear()}
          month={currentDate.getMonth() + 1}
          onClose={() => setIsModal(false)}
          onYearChange={year => setCurrentDate(new Date(year, currentDate.getMonth()))}
          onMonthSelect={month => setCurrentDate(new Date(currentDate.getFullYear(), month - 1))}
        />
      )}

      {/* 요일 레이블을 Swiper 외부로 이동 */}
      <div className="grid grid-cols-7 text-center font-hakgyoansimR mb-5">
        {daysOfWeek.map(day => (
          <div key={day} className="text-2xl">
            <span className={`${day === '일' ? 'text-sub3' : day === '토' ? 'text-sub4' : ''}`}>{day}</span>
          </div>
        ))}
      </div>

      <div ref={swiperContainerRef} className="transition-all duration-300">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          onSlideChangeTransitionStart={updateHeight}
          onSlideChange={swiper => {
            if (swiper.activeIndex === 0) {
              setCurrentDate(prevDate => subMonths(prevDate, 1));
            } else if (swiper.activeIndex === 2) {
              setCurrentDate(prevDate => addMonths(prevDate, 1));
            }
            swiper.slideTo(1, 0, false);
          }}
          initialSlide={1}>
          <SwiperSlide>
            <CalendarGrid
              date={subMonths(currentDate, 1)}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              isPanicList={isPanicList}
              isTrainingList={isTrainingList}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CalendarGrid
              date={currentDate}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              isPanicList={isPanicList}
              isTrainingList={isTrainingList}
            />
          </SwiperSlide>
          {addMonths(currentDate, 1).getFullYear() < new Date().getFullYear() ||
          (addMonths(currentDate, 1).getFullYear() === new Date().getFullYear() &&
            addMonths(currentDate, 1).getMonth() <= new Date().getMonth()) ? (
            <SwiperSlide>
              <CalendarGrid
                date={addMonths(currentDate, 1)}
                selectedDate={selectedDate}
                onDateSelect={onDateSelect}
                isPanicList={isPanicList}
                isTrainingList={isTrainingList}
              />
            </SwiperSlide>
          ) : null}
        </Swiper>
      </div>
    </div>
  );
}
