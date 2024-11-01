import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

import CalendarListIcon from '@/asset/Svg/calendarListIcon.svg';

interface CalendarHeaderProps {
  currentDate: Date;
  onOpenModal: () => void;
}

export default function CalendarHeader({ currentDate, onOpenModal }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 px-3">
      <div className="text-left" onClick={onOpenModal}>
        <p className="text-lg font-hakgyoansimR">{format(currentDate, 'yyyy년', { locale: ko })}</p>
        <p className="text-3xl font-hakgyoansimR">
          {format(currentDate, 'MM월', { locale: ko })}
          <button className="ml-3">
            <CalendarListIcon className="mb-1" />
          </button>
        </p>
      </div>
      <div className="flex space-x-4 text-lg font-hakgyoansimR">
        <Link href="/record/selfDiagnosis">
          <button>자가진단</button>
        </Link>
        <Link href="/record/report">
          <button>리포트</button>
        </Link>
      </div>
    </div>
  );
}
