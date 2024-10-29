'use client';

import Back from '@/asset/Svg/backIcon.svg';
import Ddasom from '@/asset/Svg/ddasomi.svg';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const router = useRouter();
  return (
    <div>
      <header
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)',
        }}
        className="h-80 relative flex flex-col bg-gradient-to-b from-white to-[#0cb058] -m-4 rounded-b-[32px] shadow-xl">
        <Back className="ml-6 absolute top-4" onClick={() => router.back()} />
        <Ddasom className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-44 h-44" />

        <span className="flex items-end absolute font-hakgyoansimR text-4xl text-main4 bottom-14 left-6">
          <p
            style={{
              backgroundImage: 'linear-gradient(to top, #B6D89A, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0.5px 5px 2px rgba(0, 0, 0, 0.1)',
            }}
            className="text-5xl mr-2">
            10월{' '}
          </p>
          리포트
        </span>

        <span
          style={{
            textShadow: '0.5px 2px 2px rgba(0, 0, 0, 0.2)',
          }}
          className="text-gray-800 absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-nanumBold flex items-end">
          <p
            style={{
              backgroundImage: 'linear-gradient(to top, #ffffff, #EBF4E3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '1px 4px 2px rgba(0, 0, 0, 0.1)',
            }}
            className="text-2xl font-nanumExtraBold text-main4">
            25
          </p>
          번의 기록
        </span>
      </header>
    </div>
  );
}
