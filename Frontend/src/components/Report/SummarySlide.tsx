import { ReportData } from '@/types/http/response';

import DailyReportChart from './DailyReportChart';

interface SummarySlideProps {
  reportData: ReportData;
  previousReportData: ReportData;
}

export default function SummarySlide({ reportData, previousReportData }: SummarySlideProps) {
  // 데이터가 모두 비어 있는지 확인
  const isDataEmpty =
    !reportData.dailyReport?.caffeine &&
    !previousReportData.dailyReport?.caffeine &&
    !reportData.dailyReport?.smoking &&
    !previousReportData.dailyReport?.smoking &&
    !reportData.dailyReport?.alcohol &&
    !previousReportData.dailyReport?.alcohol &&
    !reportData.dailyReport?.exercise &&
    !previousReportData.dailyReport?.exercise;

  return (
    <div>
      {isDataEmpty ? (
        <p className="text-gray-500 text-center">비교할 생활 패턴이 존재하지 않습니다.</p>
      ) : (
        <>
          <div className="flex gap-4">
            <DailyReportChart
              label="카페인"
              currentValue={reportData.dailyReport?.caffeine ?? 0}
              previousValue={previousReportData.dailyReport?.caffeine ?? 0}
            />
            <DailyReportChart
              label="니코틴"
              currentValue={reportData.dailyReport?.smoking ?? 0}
              previousValue={previousReportData.dailyReport?.smoking ?? 0}
            />
            <DailyReportChart
              label="알코올"
              currentValue={reportData.dailyReport?.alcohol ?? 0}
              previousValue={previousReportData.dailyReport?.alcohol ?? 0}
            />
            <DailyReportChart
              label="운동"
              currentValue={reportData.dailyReport?.exercise ?? 0}
              previousValue={previousReportData.dailyReport?.exercise ?? 0}
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center mr-6">
              <span className="w-3 h-3 bg-gray2 rounded-full mr-2" />
              <span className="text-xxs text-gray4">저번 달</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-main1 rounded-full mr-2" />
              <span className="text-xxs text-gray4">이번 달</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
