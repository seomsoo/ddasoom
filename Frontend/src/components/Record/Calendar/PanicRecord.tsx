'use client';
import React, { useState } from 'react';

import HerongSomi from '@/svgs/herongSomi.svg';
import MapIcon from '@/svgs/mapIcon.svg';

import MapModal from './MapModal';

interface PanicRecordProps {
  panicList: {
    startDate: string; // 발작 시간
    duration: number; // 경과 시간 (초 단위)
    latitude: number | null; // 위도
    longitude: number | null; // 경도
    address: string | null; // 완성된 주소
    description: string | null; // 당시 상황 일기
  }[];
}

export default function PanicRecord({ panicList }: PanicRecordProps) {
  const [isMapModal, setIsMapModal] = useState(false);

  const handleOpenMap = () => {
    setIsMapModal(!isMapModal);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours()}시 ${date.getMinutes()}분`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minuteText = minutes > 0 ? `${minutes}분` : '';
    const secondText = remainingSeconds > 0 ? `${remainingSeconds}초` : '';
    return `${minuteText} ${secondText}`.trim();
  };

  if (panicList.length === 0) return null;

  return (
    <div>
      {panicList.map((record, index) => (
        <div key={index} className="mt-10 relative">
          <HerongSomi className="absolute -top-7 right-7 -z-0" />
          <div className="relative bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-4 z-0">
            <p className="font-bold text-lg">공황 일지</p>
            <div className="mt-2">
              <p className="font-nanumBold">
                발생 시각 : <span className="font-nanumRegular">{formatTime(record.startDate)}</span>
              </p>
              <p className="font-nanumBold">
                경과 시간 : <span className="font-nanumRegular">{formatDuration(record.duration)}</span>
              </p>

              <div className="flex">
                <p className="font-nanumBold">장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</p>
                <div className="flex flex-col">
                  <span className="flex font-nanumRegular break-words cursor-pointer" onClick={handleOpenMap}>
                    &nbsp;: <MapIcon className="w-8 h-6 ml-2" />
                    {record.address || '주소 정보가 없습니다'}
                  </span>
                </div>
              </div>

              {isMapModal && record.latitude && record.longitude && (
                <MapModal
                  center={{
                    lat: record.latitude,
                    lng: record.longitude,
                  }}
                />
              )}
              {record.description && (
                <div className="flex">
                  <p className="font-nanumBold whitespace-nowrap ">한줄 기록 : </p>
                  <span className="font-nanumRegular ml-1 ">{record.description}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
