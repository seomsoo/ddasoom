import { ReportData } from '@/types/http/response';

interface PanicSummaryProps {
  panicReport?: ReportData['panicReport'];
}

export default function PanicSummary({ panicReport }: PanicSummaryProps) {
  return (
    <div>
      {panicReport ? (
        <>
          <span className="flex items-baseline">
            <p className="text-lg text-main1 mr-1">{panicReport.panicCount}번의</p> 공황 발작이
          </span>
          <span className="flex items-baseline mt-1">
            <p className="text-lg text-main1 mr-1">평균 {panicReport.panicDurationAverage}초</p> 동안 공황 증상이
            발현됐어요.
          </span>
        </>
      ) : (
        <p className="text-lg text-gray-500">공황 발작 정보가 없습니다.</p>
      )}
    </div>
  );
}
