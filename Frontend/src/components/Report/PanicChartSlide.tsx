import { ReportData } from '@/types/http/response';

import PanicChart from './PanicChart';

interface PanicChartSlideProps {
  reportData: ReportData;
  previousReportData: ReportData;
}

export default function PanicChartSlide({ reportData, previousReportData }: PanicChartSlideProps) {
  // 데이터가 없는지 확인
  const isDataEmpty =
    !reportData.panicReport?.panicCount &&
    !previousReportData.panicReport?.panicCount &&
    !reportData.selfDiagnosis?.totalPanicDoubtCount &&
    !previousReportData.selfDiagnosis?.totalPanicDoubtCount;

  return (
    <div>
      {isDataEmpty ? (
        <p className="text-gray-500 text-center">비교할 공황 기록이 존재하지 않습니다.</p>
      ) : (
        <>
          <div className="flex gap-4">
            <PanicChart
              label="기록된 공황 발작"
              currentValue={reportData.panicReport?.panicCount ?? 0}
              previousValue={previousReportData.panicReport?.panicCount ?? 0}
            />
            <PanicChart
              label="공황 의심 기록"
              currentValue={reportData.selfDiagnosis?.totalPanicDoubtCount ?? 0}
              previousValue={previousReportData.selfDiagnosis?.totalPanicDoubtCount ?? 0}
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
