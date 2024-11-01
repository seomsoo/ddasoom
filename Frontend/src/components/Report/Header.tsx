'use client';
import { useRouter } from 'next/navigation';

import Back from '@/asset/Svg/backIcon.svg';
import Ddasom from '@/asset/Svg/ddasomi.svg';

export default function Header() {
  const router = useRouter();

  return (
    <header
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2)',
      }}
      className="h-80 relative flex flex-col background2 -m-4 rounded-b-[55px] shadow-xl">
      <Back className="ml-6 absolute top-4" onClick={() => router.back()} />
      <Ddasom className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-44 h-44" />

      <span className="flex items-end absolute font-hakgyoansimR text-4xl bottom-14 left-6">
        <p
          className="text-5xl mr-2 text-main4  bg-clip-text"
          style={{
            textShadow: '2px 2px 6px #8EBB5B',
          }}>
          10월{' '}
        </p>
        리포트
      </span>
      <span className="text-gray-800 absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-nanumBold flex items-center">
        <p
          className="text-3xl mr-1 font-hakgyoansimR text-main4 bg-clip-text"
          style={{
            textShadow: '2px 2px 6px #8EBB5B',
          }}>
          25
        </p>
        번의 기록
      </span>
    </header>
  );
}
