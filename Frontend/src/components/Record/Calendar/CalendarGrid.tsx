import { format, isSameDay, isToday } from 'date-fns';

import DdasomiIcon from './DdasomiIcon';

interface CalendarGridProps {
  date: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  isPanicList: string[];
  isTrainingList: { date: string; trainingCount: number }[];
}

export default function CalendarGrid({
  date,
  selectedDate,
  onDateSelect,
  isPanicList,
  isTrainingList,
}: CalendarGridProps) {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // 시작 빈 칸을 이전 달의 마지막 날짜로 채우기
  const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const blankDaysStart = Array.from(
    { length: startOfMonth.getDay() },
    (_, idx) => prevMonthLastDate.getDate() - startOfMonth.getDay() + idx + 1,
  );

  // 마지막 빈 칸을 다음 달의 날짜로 채우기
  const blankDaysEnd = Array.from({ length: 6 - endOfMonth.getDay() }, (_, idx) => idx + 1);

  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 gap-y-4">
      {blankDaysStart.map((day, idx) => (
        <div key={`prev-${idx}`} className="flex flex-col items-center text-gray3">
          <div className="relative h-11 w-11 flex items-center justify-center rounded-full bg-gray2" />
          <span className="text-sm mt-2 font-hakgyoansimR w-8 rounded-xl text-center">{day}</span>
        </div>
      ))}
      {daysInMonth.map(day => {
        const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
        const isTodayDate = isToday(currentDay);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
        const dateString = format(currentDay, 'yyyy-MM-dd');
        const isPanicDay = isPanicList.includes(dateString);
        const trainingData = isTrainingList.find(item => item.date === dateString);
        const trainingCount = trainingData ? trainingData.trainingCount : 0;

        return (
          <div key={day} className="flex flex-col items-center text-gray5">
            <div
              onClick={() => {
                if (currentDay <= new Date()) {
                  onDateSelect(currentDay);
                }
              }}
              className={`relative h-11 w-11 flex items-center justify-center rounded-full ${
                currentDay <= new Date() ? 'cursor-pointer' : 'cursor-default'
              } ${isPanicDay ? 'bg-black' : 'bg-[#d6f0bf]'}`}>
              {trainingCount > 0 && <DdasomiIcon trainingCount={trainingCount} />}
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
      {blankDaysEnd.map((day, idx) => (
        <div key={`next-${idx}`} className="flex flex-col items-center text-gray3">
          <div className="relative h-11 w-11 flex items-center justify-center rounded-full bg-gray2" />
          <span className="text-sm mt-2 font-hakgyoansimR w-8 rounded-xl text-center">{day}</span>
        </div>
      ))}
    </div>
  );
}
