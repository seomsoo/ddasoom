'use client';
import React, { useState } from 'react';

import HerongSomi from '@/asset/Svg/herongSomi.svg';
import MapIcon from '@/asset/Svg/mapIcon.svg';

import MapModal from './MapModal';

interface PanicRecordProps {
  panicList: {
    start_date: string;
    duration: number;
    address: string;
    description?: string;
  } | null;
}
export default function PanicRecord({ panicList }: PanicRecordProps) {
  const [isMapModal, setIsMapModal] = useState(false);

  const handleOpenMap = () => {
    setIsMapModal(!isMapModal);
  };
  return (
    <div>
      <div className="mt-8 relative">
        <HerongSomi className="absolute -top-7 right-7 -z-0" />
        <div className="relative bg-main4 rounded-2xl border border-main1 p-3 shadow-sm mt-4 z-0">
          <p className="font-bold text-lg">공황 일지</p>
          <div className="mt-2">
            <p className="font-nanumBold">
              발생 시각 : <span className="font-nanumRegular">{panicList?.start_date}</span>
            </p>
            <p className="font-nanumBold">
              경과 시간 : <span className="font-nanumRegular">{panicList?.duration}분</span>
            </p>

            <div className="flex">
              <p className="font-nanumBold">장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</p>
              <div className="flex flex-col">
                <span className="flex font-nanumRegular break-words cursor-pointer" onClick={handleOpenMap}>
                  &nbsp;: <MapIcon className="w-8 h-6 ml-2" />
                  {panicList?.address}
                </span>
              </div>
            </div>
            {isMapModal && (
              <MapModal
                center={{
                  // 지도의 중심좌표
                  lat: 33.450701,
                  lng: 126.570667,
                }}
              />
            )}
            {panicList?.description && (
              <div className="flex">
                <p className="font-nanumBold whitespace-nowrap ">한줄 기록 : </p>
                <span className="font-nanumRegular ml-1 ">{panicList.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
