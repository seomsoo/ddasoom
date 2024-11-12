'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import queryKeys from '@/api/querykeys';
import { getReportData } from '@/api/recordAPI';
import DiaryItem from '@/components/Report/ResultItem';
import { reportMessageStyles } from '@/constants/ReportMessageStyles';

import ErrorModal from '../Common/ErrorModal';
import LoadingModal from '../Common/LoadingModal';
import SummaryBox from './SummaryBox';

interface MainContentProps {
  year: string;
  month: string;
}

export interface PanicReport {
  panicCount: number;
  panicDurationAverage: number;
  panicOccurDay: number[];
}

export interface DailyReport {
  caffeine: number;
  smoking: number;
  alcohol: number;
  exercise: number;
}

export interface ReportData {
  totalRecordCount: number;
  panicReport: PanicReport | null;
  dailyReport: DailyReport | null;
  continuousTrainingCount: number;
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
  } = useQuery<ReportData>({
    queryKey: [queryKeys.REPORT, year, month],
    queryFn: () => getReportData(year, month),
    retry: false, // 자동 재시도 비활성화
  });

  useEffect(() => {
    if (reportData) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.REPORT, year, month] });
    }
  }, [reportData, queryClient, year, month]);

  useEffect(() => {
    if (isError && error) {
      setErrorContext(error instanceof Error ? error.message : '에러 메시지 읽기 실패');
      setIsErrorModalOpen(true);
    }
  }, [isError, error]);

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    refetch(); // 요청 다시 시도
  };

  if (isLoading) return <LoadingModal />;

  const trainingStyles = reportData ? reportMessageStyles(reportData.continuousTrainingCount) : null;

  return (
    <div className="w-full max-w-md mt-8 flex flex-col font-nanumExtraBold">
      {isErrorModalOpen && (
        <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} context={errorContext} />
      )}

      <SummaryBox>
        <div>
          {reportData?.panicReport ? (
            <>
              <span className="flex items-baseline">
                <p className="text-lg text-main1 mr-1">{reportData.panicReport.panicCount}번의</p> 공황 발작과
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

      <SummaryBox>
        <div>
          <span className="flex items-baseline mt-1">이번 달 생활 패턴은 다음과 같아요.</span>
          <span className="flex items-baseline mt-1 text-xxs text-gray4">
            공황 발작에 영향을 미칠 수 있는 요인들이에요.
          </span>
        </div>
        <div className="grid grid-cols-4 mt-6 w-full justify-items-center">
          {reportData?.dailyReport ? (
            <>
              <DiaryItem label="caffeine" count={reportData.dailyReport.caffeine} />
              <DiaryItem label="cigarette" count={reportData.dailyReport.smoking} />
              <DiaryItem label="alcohol" count={reportData.dailyReport.alcohol} />
              <DiaryItem label="exercise" count={reportData.dailyReport.exercise} />
            </>
          ) : (
            <p className="text-gray5 col-span-4">일일 기록 정보가 없습니다.</p>
          )}
        </div>
      </SummaryBox>

      <SummaryBox>
        <div className="flex flex-col items-center -mb-4">
          {trainingStyles && (
            <>
              <span className={`flex font-nanumExtraBold text-2xl mb-4  ${trainingStyles.messageColor}`}>
                {trainingStyles.message}
              </span>
              {trainingStyles.icon}
            </>
          )}
        </div>
      </SummaryBox>
    </div>
  );
}
