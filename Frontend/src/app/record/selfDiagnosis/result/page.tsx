import ResultButton from '@/components/Record/SelfDiagnosis/ResultButton';
import ResultContext from '@/components/Record/SelfDiagnosis/ResultContext';

type searchParams = Record<string, string | undefined>;
interface SelfDiagnosisResultPageProps {
  searchParams: searchParams;
}

export default function SelfDiagnosisResultPage({ searchParams }: SelfDiagnosisResultPageProps) {
  const yesCount = parseInt(searchParams.yesCount || '0', 10); // 쿼리 파라미터에서 yesCount 값을 가져오기
  const isPanicSuspected = yesCount >= 4;

  return (
    <div className="flex flex-col items-center justify-center">
      <ResultContext isPanicSuspected={isPanicSuspected}/>
      <ResultButton isPanicSuspected={isPanicSuspected} />
    </div>
  );
}
