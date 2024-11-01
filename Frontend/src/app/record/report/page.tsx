'use client';

import { useRouter } from 'next/navigation';

import DiaryItem from '@/components/Record/ResultItem';
import Back from '@/svgs/backIcon.svg';
import Ddasom from '@/svgs/ddasomi.svg';
import Ddasom2 from '@/svgs/greensunglass.svg';
export default function ReportPage() {
  const router = useRouter();

  const daysData = [7, 14, 23];

  return (
    <>
      <header
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2)',
        }}
        className="h-80 relative flex flex-col bg-gradient-to-b  from-white to-[#58da7f] -m-4 rounded-b-[55px] shadow-xl ">
        <Back className="ml-6 absolute top-4" onClick={() => router.back()} />
        <Ddasom className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-44 h-44" />

        <span className="flex items-end absolute font-hakgyoansimR text-4xl text-main4 bottom-14 left-6">
          <p
            style={{
              backgroundImage: 'linear-gradient(to top, #74F800, #ffffff)',
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

      <main className="w-full max-w-md mt-8 flex flex-col font-nanumExtraBold">
        <div
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.1)',
          }}
          className="relative rounded-3xl bg-main4 py-6 px-5">
          <div>
            <span className="flex items-baseline ">
              <p className="mr-1 text-lg text-main1">3번의</p> 공황 발작과
            </span>
            <span className="flex items-baseline mt-1">
              <p className="mr-1 text-lg text-main1">평균 30초</p> 동안 공황증상이 발현됐어요.
            </span>

            <div
              className={`grid gap-4 mt-6 w-full justify-items-center ${
                daysData.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
              {daysData.map((day, index) => (
                <article key={index} className="flex justify-center items-center">
                  <div className="bg-main2 w-12 h-12 rounded-full opacity-40 flex justify-center items-center">
                    <p className="opacity-100 text-black">{day}일</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.1)',
          }}
          className="relative rounded-3xl bg-main4 py-10 mt-3 px-5">
          <div>
            <span className="flex items-baseline">
              <p className="text-lg text-main1">니코틴</p>을 가장 많이
            </span>
            <span className="flex items-baseline mt-1">기록했어요</span>
          </div>

          <article className="grid grid-cols-4 mt-6 w-full justify-items-center">
            <DiaryItem label="caffeine" count={5} />
            <DiaryItem label="cigarette" count={7} />
            <DiaryItem label="alcohol" count={1} />
            <DiaryItem label="exercise" count={0} />
          </article>
        </div>
        <div
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.1)',
          }}
          className="relative rounded-3xl bg-main4 py-10 mt-3 px-5">
          <div className="flex flex-col items-center">
            <span className="flex font-nanumExtraBold text-2xl mb-4 ">
              <p className="text-main1 mr-1">9연속</p> 훈련을 달성 했어요!
            </span>
            <Ddasom2 />
          </div>
        </div>
      </main>
    </>
  );
}
