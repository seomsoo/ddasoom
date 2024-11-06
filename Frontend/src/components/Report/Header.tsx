'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import queryKeys from '@/api/querykeys';
import { getReportData } from '@/api/recordAPI';
import background from '@/components/BackGround/Background.module.css';
import Back from '@/svgs/backIcon.svg';
import Ddasom from '@/svgs/ddasomi.svg';

interface HeaderProps {
  year: string;
  month: string;
}

export default function Header({ year, month }: HeaderProps) {
  const router = useRouter();

  const { data: headerData, isLoading } = useQuery({
    queryKey: [queryKeys.REPORT, year, month],
    queryFn: () => getReportData(year, month),
  });

  return (
    <header
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2)',
      }}
      className={`${background.background2} h-80 relative flex flex-col -m-4 rounded-b-[55px] shadow-xl`}>
      <Back className="ml-6 absolute top-4 cursor-pointer" onClick={() => router.back()} />
      <Ddasom className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-44 h-44" />

      <span className="flex items-end absolute font-hakgyoansimR text-4xl bottom-14 left-6">
        <p
          className="text-5xl mr-2 text-main4 bg-clip-text"
          style={{
            textShadow: '2px 2px 6px #8EBB5B',
          }}>
          {month}월
        </p>
        리포트
      </span>

      <span className="text-gray-800 absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-nanumBold flex items-center">
        <p
          className="text-3xl mr-1 font-hakgyoansimR text-main4 bg-clip-text"
          style={{
            textShadow: '2px 2px 6px #8EBB5B',
          }}>
          {isLoading ? '로딩 중...' : headerData?.totalRecordCount || 0}
        </p>
        번의 기록
      </span>
    </header>
  );
}
