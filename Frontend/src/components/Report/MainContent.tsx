'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import queryKeys from '@/api/querykeys';
import { getReportData } from '@/api/recordAPI';

import ErrorModal from '../Common/ErrorModal';
import LoadingModal from '../Common/LoadingModal';
import DailyReportSection from './DailyReportSection';
import PanicChartSlide from './PanicChartSlide';
import PanicSummary from './PanicSummary';
import PercentageChangeSlide from './PercentageChangeSlide';
import SummaryBox from './SummaryBox';
import SummarySlide from './SummarySlide';

interface MainContentProps {
  year: string;
  month: string;
}

export default function MainContent({ year, month }: MainContentProps) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');

  // 현재 달 데이터 가져오기
  const {
    data: reportData,
    isLoading: isReportLoading,
    isError: isReportError,
    error: reportError,
    refetch: refetchReport,
  } = useQuery({
    queryKey: [queryKeys.REPORT, year, month],
    queryFn: () => getReportData(year, month),
    retry: false,
  });

  // 전달 데이터 가져오기
  const {
    data: previousReportData,
    isLoading: isPreviousLoading,
    isError: isPreviousError,
    error: previousError,
  } = useQuery({
    queryKey: [queryKeys.REPORT, 'previous', year, month],
    queryFn: () => {
      const prevMonth = month === '01' ? '12' : String(Number(month) - 1).padStart(2, '0');
      const prevYear = month === '01' ? String(Number(year) - 1) : year;
      return getReportData(prevYear, prevMonth);
    },
    retry: false,
  });

  // 에러 핸들링
  if (isReportError || isPreviousError) {
    const errorMessage =
      reportError instanceof Error
        ? reportError.message
        : previousError instanceof Error
          ? previousError.message
          : '에러 메시지 읽기 실패';
    if (!isErrorModalOpen) {
      setErrorContext(errorMessage);
      setIsErrorModalOpen(true);
    }
  }

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    refetchReport();
  };

  if (isReportLoading || isPreviousLoading) return <LoadingModal />;

  return (
    <div className="w-full max-w-md mt-8 flex flex-col font-nanumExtraBold">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}

      {/* 공황 발작 정보 */}
      <SummaryBox>
        <PanicSummary panicReport={reportData?.panicReport} />
      </SummaryBox>

      {/* 생활 패턴 */}
      <DailyReportSection dailyReport={reportData?.dailyReport ?? null} />

      {/* 전달 대비 변화 */}
      {reportData && previousReportData && (
        <>
          <SummaryBox>
            <PercentageChangeSlide reportData={reportData} previousReportData={previousReportData} />
          </SummaryBox>

          <SummaryBox>
            <PanicChartSlide reportData={reportData} previousReportData={previousReportData} />
          </SummaryBox>

          <SummaryBox>
            <SummarySlide reportData={reportData} previousReportData={previousReportData} />
          </SummaryBox>
        </>
      )}
    </div>
  );
}
