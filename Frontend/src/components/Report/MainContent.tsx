'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import queryKeys from '@/api/querykeys';
import { getReportData } from '@/api/recordAPI';
import DailyReportSection from '@/components/Report/DailyReportSection';
import { reportMessageStyles } from '@/constants/ReportMessageStyles';

import ErrorModal from '../Common/ErrorModal';
import LoadingModal from '../Common/LoadingModal';
import SummaryBox from './SummaryBox';

interface MainContentProps {
  year: string;
  month: string;
}

export default function MainContent({ year, month }: MainContentProps) {
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorContext, setErrorContext] = useState<string>('');

  const {
    data: reportData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.REPORT, year, month],
    queryFn: () => getReportData(year, month),
    retry: false,
  });

  const trainingStyles = reportData ? reportMessageStyles(reportData.continuousTrainingCount) : null;

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.REPORT, year, month] });
    if (isError && error) {
      setErrorContext(error instanceof Error ? error.message : '에러 메시지 읽기 실패');
      setIsErrorModalOpen(true);
    }
  }, [isError, error]);

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    refetch();
  };

  if (isLoading) return <LoadingModal />;

  return (
    <div className="w-full max-w-md mt-8 flex flex-col font-nanumExtraBold">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}

      {/* 공황 발작 정보 */}
      <SummaryBox>
        <div>
          {reportData?.panicReport ? (
            <>
              <span className="flex items-baseline">
                <p className="text-lg text-main1 mr-1">{reportData.panicReport.panicCount}번의</p> 공황 발작이
              </span>
              <span className="flex items-baseline mt-1">
                <p className="text-lg text-main1 mr-1">평균 {reportData.panicReport.panicDurationAverage}초</p> 동안
                공황 증상이 발현됐어요.
              </span>
            </>
          ) : (
            <p className="text-lg text-gray-500">공황 발작 정보가 없습니다.</p>
          )}
        </div>
      </SummaryBox>

      {/* 생활 패턴 */}
      <DailyReportSection dailyReport={reportData?.dailyReport ?? null} />

      <SummaryBox>
        <div className="flex flex-col items-center -mb-4">
          {trainingStyles && (
            <>
              <span className={`flex font-nanumExtraBold text-2xl mb-4  ${trainingStyles.messageColor}`}>
                {trainingStyles.message}
              </span>
              {trainingStyles.icon}{' '}
            </>
          )}
        </div>
      </SummaryBox>
    </div>
  );
}
