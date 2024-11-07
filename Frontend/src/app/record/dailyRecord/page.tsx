import Header from '@/components/Common/Header';
import WriteRecord from '@/components/Record/DailyRecord/WriteRecord';

type SearchParmas = Record<string, string | string | undefined>;
interface DailyRecordPageSearchParams {
  searchParams: SearchParmas;
}

export default function DailyRecordPage({ searchParams }: DailyRecordPageSearchParams) {
  // 쿼리 파라미터에서 year, month, day 가져오기
  const year = searchParams.year;
  const month = searchParams.month;
  const day = searchParams.day;

  // 선택된 날짜 label
  const label = year && month && day ? `${year}년 ${month}월 ${day}일` : '';

  return (
    <div>
      <Header label={label} />
      <WriteRecord dateYear={year} dateMonth={month} dateDay={day} />
    </div>
  );
}
