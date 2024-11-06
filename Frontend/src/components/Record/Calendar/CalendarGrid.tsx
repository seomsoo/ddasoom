import { useQuery } from '@tanstack/react-query';
import { format, isSameDay, isToday } from 'date-fns';

import queryKeys from '@/api/querykeys';
import { getMonthlyData } from '@/api/recordAPI';
import { Calendars } from '@/types/http/response';

import DdasomiIcon from './DdasomiIcon';

interface CalendarGridProps {
  date: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export default function CalendarGrid({ date, selectedDate, onDateSelect }: CalendarGridProps) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // 월별 데이터를 가져오는 쿼리
  const { data: monthlyData } = useQuery({
    queryKey: [queryKeys.MONTHLY_RECORD, year, month + 1],
    queryFn: () => getMonthlyData(year.toString(), (month + 1).toString()),
  });

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  // 시작 빈 칸을 이전 달의 마지막 날짜로 채우기
  const prevMonthLastDate = new Date(year, month, 0);
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
        const currentDay = new Date(year, month, day);
        const isTodayDate = isToday(currentDay);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
        const dateString = format(currentDay, 'yyyy-MM-dd');

        // 월별 데이터에서 현재 날짜에 해당하는 데이터를 찾기
        const dayData: Calendars | undefined = monthlyData?.data.calendars.find(
          (item: Calendars) => item.date === dateString,
        );

        const isPanicDay = dayData?.panicStatus || false;
        const trainingCount = dayData?.trainingCount || 0;
        const isFutureDate = currentDay > new Date();

        return (
          <div key={day} className="flex flex-col items-center text-gray5">
            <div
              onClick={() => {
                if (!isFutureDate) {
                  onDateSelect(currentDay);
                }
              }}
              className={`relative h-11 w-11 flex items-center justify-center rounded-full ${
                isFutureDate ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
              } ${isPanicDay ? 'bg-black' : 'bg-[#d6f0bf]'}`}>
              {trainingCount > 0 && <DdasomiIcon trainingCount={trainingCount} />}
            </div>
            <span
              className={`text-sm mt-2 font-hakgyoansimR w-8 rounded-xl text-center ${
                isSelected
                  ? 'bg-main1 text-gray1'
                  : isTodayDate
                    ? 'bg-indigo-300 text-white'
                    : isFutureDate
                      ? 'opacity-30'
                      : ''
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
