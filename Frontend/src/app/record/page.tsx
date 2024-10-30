'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import GreenSomi from '@/asset/Svg/greenSomi.svg';
import HerongSomi from '@/asset/Svg/herongSomi.svg';
import MapIcon from '@/asset/Svg/mapIcon.svg';
import OrangeSomi from '@/asset/Svg/orangeSomi.svg';
import AddIcon from '@/asset/Svg/plusCircle.svg';
import YellowSomi from '@/asset/Svg/yellowSomi.svg';
import Navbar from '@/components/Navbar';
import Calendar from '@/components/Record/Calendar';
import DiaryItem from '@/components/Record/DiaryItem';
import MapModal from '@/components/Record/MapModal';

export default function RecordPage() {
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
  const router = useRouter();

  // 공황 발생 날짜 목록
  const panicDataList = useMemo(
    () => [
      {
        start_date: '2024-10-29 13:30',
        duration: 5,
        address: '서울특별시 강남구 삼성동',
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

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date());
      return;
    }

    const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(
      selectedDate.getDate(),
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
  }, [selectedDate, panicDataList, trainingDataList]);

  const displayDate = selectedDate || new Date();
  const selectedDay = ['일', '월', '화', '수', '목', '금', '토'][displayDate.getDay()];

  const handleAddRecord = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth() + 1;
    const day = displayDate.getDate();

    router.push(`/record/dailyRecord?year=${year}&month=${month}&day=${day}`);
  };

  // DdaSomi 아이콘 조건부 렌더링
  const renderSomiIcon = () => {
    if (!todayTraining) return null;

    switch (todayTraining.trainingList.length) {
      case 1:
        return <YellowSomi className="mb-2" />;
      case 2:
        return <OrangeSomi className="mb-2" />;
      case 3:
        return <GreenSomi className="mb-2" />;
      default:
        return null;
    }
  };
  const isTrainingList = trainingDataList.map(training => ({
    date: training.date,
    trainingCount: training.trainingList.length,
  }));

  const handleOpenMap = () => {
    setIsMapModal(true);
  };

  return (
    <div className="pb-32">
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        isPanicList={isPanicList} // 공황 발생 날짜 목록 전달
        isTrainingList={isTrainingList} // 날짜별 훈련 데이터 전달
      />

      {/* 공황 일지 박스: panicData가 있을 때만 표시 */}
      {panicData && (
        <div>
          <HerongSomi className="mt-6 -mb-5 ml-5 " />
          <div className="bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-4">
            <p className="font-bold text-lg">공황 일지</p>
            <div className="mt-2">
              <p className="font-nanumBold">
                발생 시각 : <span className="font-nanumRegular">{panicData.start_date}</span>
              </p>
              <p className="font-nanumBold">
                경과 시간 : <span className="font-nanumRegular">{panicData.duration}분</span>
              </p>
              <p className="flex font-nanumBold">
                장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 :{' '}
                <span className="flex font-nanumRegular inline-block align-top w-56" onClick={handleOpenMap}>
                  <MapIcon className="w-8 h-6 ml-2" />
                  {panicData.address}
                </span>
                {isMapModal && (
                  <MapModal
                    center={{
                      // 지도의 중심좌표
                      lat: 33.450701,
                      lng: 126.570667,
                    }}
                    level={3} // 지도의 확대 레벨
                    onClose={() => setIsMapModal(false)}
                  />
                )}
              </p>
              {panicData.description && (
                <p className="font-nanumBold">
                  한줄 기록 :{' '}
                  <span className="font-nanumRegular inline-block align-top w-60">{panicData.description}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-4 flex">
        <div className="flex flex-col items-center mr-4 font-nanumBold text-gray5">
          {renderSomiIcon()}
          <div className="bg-main3 rounded-2xl p-2 text-center text-xxs w-15 h-5 text-nowrap flex items-center justify-center">
            <div>
              {displayDate.getDate()} {selectedDay}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 font-nanumBold text-gray5 text-center text-xxs">
            오늘 한 훈련
            {todayTraining?.trainingList.map((training, index) => (
              <div key={index} className="bg-gray2 rounded-full px-2 py-1">
                {training}
              </div>
            ))}
          </div>
        </div>

        <div className="border-l border-gray3 mr-4" />

        <div className="flex flex-col justify-center text-main1 font-nanumBold w-56">
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
                {todayRecord.diaryEntry && (
                  <p className="w-full mt-4 ml-3 text-black text-sm">{todayRecord.diaryEntry}</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div>
                <p className="text-sm mb-5">오늘 하루를 기록 하시겠어요?</p>
              </div>
              <AddIcon onClick={handleAddRecord} className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
