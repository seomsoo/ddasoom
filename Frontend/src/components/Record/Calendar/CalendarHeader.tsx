import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

import CalendarListIcon from '@/svgs/calendarListIcon.svg';

interface CalendarHeaderProps {
  currentDate: Date;
  onOpenModal: () => void;
}

export default function CalendarHeader({ currentDate, onOpenModal }: CalendarHeaderProps) {
  // 파라미터로 사용할 값 생성
  const year = format(currentDate, 'yyyy', { locale: ko });
  const month = format(currentDate, 'MM', { locale: ko });

  return (
    <div className="flex justify-between items-center mb-6 px-3">
      <div className="text-left" onClick={onOpenModal}>
        <p className="text-lg font-hakgyoansimR">{`${year}년`}</p>
        <p className="text-3xl font-hakgyoansimR">
          {`${month}월`}
          <button className="ml-3">
            <CalendarListIcon className="mb-1" />
          </button>
        </p>
      </div>
      <div className="flex space-x-4 text-lg font-hakgyoansimR">
        <Link href="/record/selfDiagnosis">
          <button>자가진단</button>
        </Link>
        <Link href={`/record/report?year=${year}&month=${month}`}>
          <button>리포트</button>
        </Link>
      </div>
    </div>
  );
}
