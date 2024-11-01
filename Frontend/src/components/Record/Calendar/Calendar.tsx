'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import CustomCalendar from '@/components/Record/Calendar/CustomCalendar';

import PanicRecord from './PanicRecord';
import TodayRecord from './TodayRecord';

interface CalendarProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Calendar({ searchParams }: CalendarProps) {
  const router = useRouter();

  const [todayTraining, setTodayTraining] = useState<{ date: string; trainingList: string[] } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todayRecord, setTodayRecord] = useState<{
    date: string | null;
    description: string | null;
    selectedIcons: string[] | null;
  }>({
    date: null,
    description: null,
    selectedIcons: null,
  });
  const [panicData, setPanicData] = useState<{
    start_date: string;
    duration: number;
    address: string;
    description?: string;
  } | null>(null);

  const panicDataList = useMemo(
    () => [
      {
        start_date: '2024-10-24 13:30',
        duration: 5,
        address: '서울특별시 강남구 삼성동 99-7',
        description: '지하철에서 갑작스럽게 공황이 왔다. 숨이 잘 안 쉬어져서 너무 힘들었다.',
      },
      {
        start_date: '2024-10-28 10:00',
        duration: 3,
        address: '광주광역시 광산구 수완동',
        description: '엔젤에 사람이 너무 많았다.',
      },
    ],
    [],
  );

  const trainingDataList = useMemo(
    () => [
      {
        date: '2024-10-24',
        trainingList: ['호흡연습', '안정화기법'],
      },
      {
        date: '2024-10-02',
        trainingList: ['호흡연습'],
      },
      {
        date: '2024-10-23',
        trainingList: ['호흡연습', '그라운딩', '안정화기법'],
      },
    ],
    [],
  );

  const isPanicList = useMemo(() => panicDataList.map(entry => entry.start_date.split(' ')[0]), [panicDataList]);
  const isTrainingList = trainingDataList.map(training => ({
    date: training.date,
    trainingCount: training.trainingList.length,
  }));

  useEffect(() => {
    const year = searchParams.year;
    const month = searchParams.month;
    const day = searchParams.day;
    const initialDate = year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : new Date();
    setSelectedDate(initialDate); // 선택된 날짜 업데이트
  }, [searchParams]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(
        selectedDate.getDate(),
      ).padStart(2, '0')}`;

      const dateKey = `dailyRecord-${formattedDate}`;
      const storedRecord = localStorage.getItem(dateKey);

      if (storedRecord) {
        const parsedRecord = JSON.parse(storedRecord);
        setTodayRecord({
          date: parsedRecord.date,
          description: parsedRecord.description,
          selectedIcons: parsedRecord.selectedIcons,
        });
      } else {
        setTodayRecord({ date: null, description: null, selectedIcons: null });
      }

      const matchedData = panicDataList.find(entry => entry.start_date.startsWith(formattedDate));
      setPanicData(matchedData || null);

      const matchedTrainingData = trainingDataList.find(entry => entry.date === formattedDate);
      setTodayTraining(matchedTrainingData || null);
    }
  }, [selectedDate, panicDataList, trainingDataList]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    router.push(`/record?year=${year}&month=${month}&day=${day}`);
  };

  console.log('selectedDate:', selectedDate);
  return (
    <div className="pb-32">
      <CustomCalendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        isPanicList={isPanicList}
        isTrainingList={isTrainingList}
      />
      {panicData && <PanicRecord panicList={panicData} />}
      <TodayRecord training={todayTraining} date={selectedDate || new Date()} record={todayRecord} />
    </div>
  );
}
