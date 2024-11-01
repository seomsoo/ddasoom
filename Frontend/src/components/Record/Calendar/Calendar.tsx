'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import CustomCalendar from '@/components/Record/Calendar/CustomCalendar';

import PanicRecord from './PanicRecord';
import TodayRecord from './TodayRecord';

export default function Calendar({ searchParams }: SearchParamsProps) {
  const router = useRouter();

  const [todayTraining, setTodayTraining] = useState<{ date: string; trainingList: string[] } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todayRecord, setTodayRecord] = useState<{ diaryEntry: string | null; selectedIcons: string[] | null }>({
    diaryEntry: null,
    selectedIcons: null,
  });
  const [panicData, setPanicData] = useState<{
    start_date: string;
    duration: number;
    address: string;
    description?: string;
  } | null>(null);

  // 공황 발생 날짜 목록
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

  // 공황 장애 발생 날짜만 추출하여 문자열 배열로 생성
  const isPanicList = useMemo(() => {
    return panicDataList.map(entry => entry.start_date.split(' ')[0]); // 'YYYY-MM-DD' 형식만 추출
  }, [panicDataList]);

  const isTrainingList = trainingDataList.map(training => ({
    date: training.date,
    trainingCount: training.trainingList.length,
  }));

  useEffect(() => {
    const year = searchParams.year;
    const month = searchParams.month;
    const day = searchParams.day;
    const initialDate = year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : new Date();
    setSelectedDate(initialDate);

    // 선택된 날짜 형식 변환
    const formattedDate = `${initialDate.getFullYear()}-${String(initialDate.getMonth() + 1).padStart(2, '0')}-${String(
      initialDate.getDate(),
    ).padStart(2, '0')}`;

    // 로컬 스토리지에서 해당 날짜의 기록 가져오기
    const dateKey = `dailyRecord-${formattedDate}`;
    const storedRecord = localStorage.getItem(dateKey);
    if (storedRecord) {
      const parsedRecord = JSON.parse(storedRecord);
      setTodayRecord({
        diaryEntry: parsedRecord.diaryEntry,
        selectedIcons: parsedRecord.selectedIcons,
      });
    } else {
      setTodayRecord({ diaryEntry: null, selectedIcons: null });
    }

    // panicDataList에서 선택된 날짜에 맞는 데이터 가져오기
    const matchedData = panicDataList.find(entry => entry.start_date.startsWith(formattedDate));
    setPanicData(matchedData || null);

    // trainingDataList에서 선택된 날짜에 맞는 데이터 가져오기
    const matchedTrainingData = trainingDataList.find(entry => entry.date === formattedDate);
    setTodayTraining(matchedTrainingData || null);
  }, [searchParams, panicDataList, trainingDataList]);

  const displayDate = selectedDate || new Date();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    router.push(`/record?year=${year}&month=${month}&day=${day}`);
  };

  return (
    <div className="pb-32">
      <CustomCalendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        isPanicList={isPanicList} // 공황 발생 날짜 목록 전달
        isTrainingList={isTrainingList} // 날짜별 훈련 데이터 전달
      />
      {panicData && <PanicRecord panicList={panicData} />}
      <TodayRecord training={todayTraining} date={displayDate} record={todayRecord} />
    </div>
  );
}
