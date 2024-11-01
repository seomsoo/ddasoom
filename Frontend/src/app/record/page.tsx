'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import Navbar from '@/components/Navbar';
import Calendar from '@/components/Record/Calendar';
import DiaryItem from '@/components/Record/DiaryItem';
import MapModal from '@/components/Record/MapModal';
import GreenSomi from '@/svgs/greenSomi.svg';
import HerongSomi from '@/svgs/herongSomi.svg';
import MapIcon from '@/svgs/mapIcon.svg';
import OrangeSomi from '@/svgs/orangeSomi.svg';
import AddIcon from '@/svgs/plusCircle.svg';
import Seed from '@/svgs/seedling.svg';
import YellowSomi from '@/svgs/yellowSomi.svg';

export default function RecordPage({ searchParams }: SearchParamsProps) {
  const router = useRouter();

  const [todayTraining, setTodayTraining] = useState<{ date: string; trainingList: string[] } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isMapModal, setIsMapModal] = useState(false);
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
  const selectedDay = ['일', '월', '화', '수', '목', '금', '토'][displayDate.getDay()];

  const handleAddRecord = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth() + 1;
    const day = displayDate.getDate();

    router.push(`/record/dailyRecord?year=${year}&month=${month}&day=${day}`);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    router.push(`/record?year=${year}&month=${month}&day=${day}`);
  };

  /* eslint-disable indent */
  // 훈련 기록에 따른 따소미 캐릭터
  // ESLint 규칙에 따라 들여쓰기 8칸은 오류
  // 이 코드에서만 규칙 비활성화
  const renderSomiIcon = () => {
    switch (todayTraining?.trainingList.length) {
      case 1:
        return <YellowSomi className="mb-2" />;
      case 2:
        return <OrangeSomi className="mb-2" />;
      case 3:
        return <GreenSomi className="mb-2" />;
      default:
        return <HerongSomi className="mb-2" />;
    }
  };
  /* eslint-enable indent */

  const handleOpenMap = () => {
    setIsMapModal(true);
  };

  return (
    <div className="pb-32">
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        isPanicList={isPanicList} // 공황 발생 날짜 목록 전달
        isTrainingList={isTrainingList} // 날짜별 훈련 데이터 전달
      />

      {/* 공황 일지 : panicData가 있을 때만 표시 */}
      {panicData && (
        <div className="mt-8 relative">
          <HerongSomi className="absolute -top-7 right-7 -z-0" />
          <div className="relative bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-4 z-0">
            <p className="font-bold text-lg">공황 일지</p>
            <div className="mt-2">
              <p className="font-nanumBold">
                발생 시각 : <span className="font-nanumRegular">{panicData.start_date}</span>
              </p>
              <p className="font-nanumBold">
                경과 시간 : <span className="font-nanumRegular">{panicData.duration}분</span>
              </p>
              <div className="flex">
                <p className="flex font-nanumBold">장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</p>
                <span className="flex font-nanumRegular break-words" onClick={handleOpenMap}>
                  &nbsp;: <MapIcon className="w-8 h-6 ml-2" />
                  {panicData.address}
                </span>
                {isMapModal && (
                  <MapModal
                    center={{
                      // 지도의 중심좌표
                      lat: 33.450701,
                      lng: 126.570667,
                    }}
                    onClose={() => setIsMapModal(false)}
                  />
                )}
              </div>
              {panicData.description && (
                <div className="flex">
                  <p className="font-nanumBold whitespace-nowrap ">한줄 기록 : </p>
                  <span className="font-nanumRegular ml-1 ">{panicData.description}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 생활 기록 */}
      <div className="relative bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-5 min-h-60 flex">
        <Seed className="absolute -top-4 left-3" />
        {/* 훈련 기록 */}
        <div className="flex flex-col items-center mr-3 font-nanumBold min-w-16 text-gray5">
          {renderSomiIcon()}
          <div className="bg-main3 rounded-2xl p-2 text-center text-xxs w-15 h-5 text-nowrap flex items-center justify-center">
            <div>
              {displayDate.getDate()} {selectedDay}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 font-nanumBold text-gray5 text-center text-xxs text-nowrap">
            오늘 한 훈련
            {todayTraining?.trainingList.map((training, index) => (
              <div key={index} className="bg-gray2 rounded-full px-2 py-2">
                {training}
              </div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-l border-gray3 mr-3" />

        {/* 데일리 기록 */}
        <div className="flex flex-col text-main1 font-nanumBold w-full ">
          {todayRecord.diaryEntry || todayRecord.selectedIcons ? (
            <>
              <div className="flex justify-center">
                <DiaryItem labels={todayRecord.selectedIcons} />
              </div>
              <div className="mt-6 text-black text-sm">
                {todayRecord.diaryEntry ? (
                  <p className="w-full break-words px-2">{todayRecord.diaryEntry}</p>
                ) : (
                  <p className="text-center">오늘의 한 줄 일기가 없습니다.</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center mt-16">
              <p className="text-sm mb-5">오늘 하루를 기록 하시겠어요?</p>
              <AddIcon onClick={handleAddRecord} className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
