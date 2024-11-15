// DailyReportSection.tsx
'use client';

import DiaryItem from '@/components/Report/ResultItem';
import { getMostFrequentActivities } from '@/utils/getMostFrequentActivities';

import SummaryBox from './SummaryBox';

interface DailyReport {
  caffeine: number;
  smoking: number;
  alcohol: number;
  exercise: number;
}

interface DailyReportSectionProps {
  dailyReport: DailyReport | null;
}

export default function DailyReportSection({ dailyReport }: DailyReportSectionProps) {
  const mostFrequentActivities = dailyReport ? getMostFrequentActivities(dailyReport) : [];
  const activityMessage =
    mostFrequentActivities.length === 1
      ? `${mostFrequentActivities[0]}이 가장 많았어요.`
      : '이번 달 생활 패턴은 다음과 같아요.';

  return (
    <SummaryBox>
      <div>
        <p className="text-lg text-gray-700">{activityMessage}</p>
        <span className="flex items-baseline mt-1 text-xxs text-gray4">
          공황 발작에 영향을 미칠 수 있는 요인들이에요.
        </span>
      </div>
      <div className="grid grid-cols-4 mt-6 w-full justify-items-center">
        {dailyReport ? (
          <>
            <DiaryItem label="caffeine" count={dailyReport.caffeine} />
            <DiaryItem label="cigarette" count={dailyReport.smoking} />
            <DiaryItem label="alcohol" count={dailyReport.alcohol} />
            <DiaryItem label="exercise" count={dailyReport.exercise} />
          </>
        ) : (
          <p className="text-gray5 col-span-4">일일 기록이 없습니다.</p>
        )}
      </div>
    </SummaryBox>
  );
}
