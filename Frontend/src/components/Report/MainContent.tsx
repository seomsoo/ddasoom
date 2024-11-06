import { useQuery } from '@tanstack/react-query';

import queryKeys from '@/api/querykeys';
import { getReportData } from '@/api/recordAPI';
import DiaryItem from '@/components/Record/ResultItem';
import Ddasom2 from '@/svgs/greensunglass.svg';

import SummaryBox from './SummaryBox';

interface MainContentProps {
  year: string;
  month: string;
}

export default function MainContent({ year, month }: MainContentProps) {
  const { data: ReportData } = useQuery({
    queryKey: [queryKeys.REPORT, year, month],
    queryFn: () => getReportData(year, month),
  });
  console.log('ReportData:', ReportData);

  return (
    <main className="w-full max-w-md mt-8 flex flex-col font-nanumExtraBold">
      <SummaryBox>
        <div>
          <span className="flex items-baseline">
            <p className="text-lg text-main1 mr-1">3번의</p> 공황 발작과
          </span>
          <span className="flex items-baseline mt-1">
            <p className="text-lg text-main1 mr-1">평균 30초</p> 동안 공황증상이 발현됐어요.
          </span>
          {/* <div
            className={`grid gap-4 mt-6 w-full justify-items-center ${daysData.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
            {daysData.map((day, index) => (
              <div key={index} className="bg-main2 w-12 h-12 rounded-full opacity-40 flex justify-center items-center">
                <p className="opacity-100 text-black">{day}일</p>
              </div>
            ))}
          </div> */}
        </div>
      </SummaryBox>

      <SummaryBox>
        <div>
          <span className="flex items-baseline">
            <p className="text-lg text-main1">니코틴</p>을
          </span>
          <span className="flex items-baseline mt-1">가장 많이 기록했어요</span>
        </div>
        <div className="grid grid-cols-4 mt-6 w-full justify-items-center">
          <DiaryItem label="caffeine" count={5} />
          <DiaryItem label="cigarette" count={7} />
          <DiaryItem label="alcohol" count={1} />
          <DiaryItem label="exercise" count={0} />
        </div>
      </SummaryBox>

      <SummaryBox>
        <div className="flex flex-col items-center">
          <span className="flex font-nanumExtraBold text-2xl mb-4">
            <p className="text-main1 mr-1">9연속</p> 훈련을 달성 했어요!
          </span>
          <Ddasom2 />
        </div>
      </SummaryBox>
    </main>
  );
}
