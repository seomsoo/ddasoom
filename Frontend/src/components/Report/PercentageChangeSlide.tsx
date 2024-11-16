import { ReportData } from '@/types/http/response';

interface PercentageChangeSlideProps {
  reportData: ReportData;
  previousReportData: ReportData;
}

function calculatePercentageChange(current: number, previous: number): string {
  if (previous === 0) {
    return current > 0 ? '+100%' : '0%'; // 이전 값이 0일 때
  }
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
}

function getTextColor(change: number, label: string): string {
  if (change === 0) return 'text-black'; // 변화가 없을 때 검은색
  if (label === '운동') {
    return change > 0 ? 'text-sub5' : 'text-sub3'; // 운동: 증가 시 초록색, 감소 시 빨간색
  }
  return change > 0 ? 'text-sub3' : 'text-sub5'; // 나머지: 증가 시 빨간색, 감소 시 초록색
}

export default function PercentageChangeSlide({ reportData, previousReportData }: PercentageChangeSlideProps) {
  const items = [
    {
      label: '기록된 공황 발작',
      current: reportData.panicReport?.panicCount ?? 0,
      previous: previousReportData.panicReport?.panicCount ?? 0,
    },
    {
      label: '공황 의심 기록',
      current: reportData.selfDiagnosis?.totalPanicDoubtCount ?? 0,
      previous: previousReportData.selfDiagnosis?.totalPanicDoubtCount ?? 0,
    },
    {
      label: '카페인',
      current: reportData.dailyReport?.caffeine ?? 0,
      previous: previousReportData.dailyReport?.caffeine ?? 0,
    },
    {
      label: '니코틴',
      current: reportData.dailyReport?.smoking ?? 0,
      previous: previousReportData.dailyReport?.smoking ?? 0,
    },
    {
      label: '알코올',
      current: reportData.dailyReport?.alcohol ?? 0,
      previous: previousReportData.dailyReport?.alcohol ?? 0,
    },
    {
      label: '운동',
      current: reportData.dailyReport?.exercise ?? 0,
      previous: previousReportData.dailyReport?.exercise ?? 0,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg mb-4">전달 대비 변화</p>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => {
          const current = item.current;
          const previous = item.previous;
          const change = current - previous;
          const colorClass = getTextColor(change, item.label);

          return (
            <div key={index} className="flex flex-col items-center justify-center p-4 bg-gray rounded-lg shadow">
              <p className="text-sm font-nanumBold">{item.label}</p>
              <p className={`text-lg mt-2 ${colorClass}`}>{calculatePercentageChange(current, previous)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
