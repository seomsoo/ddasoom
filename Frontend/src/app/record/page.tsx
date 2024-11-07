import Navbar from '@/components/Common/Navbar';
import Calendar from '@/components/Record/Calendar/Calendar';

export default function RecordPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return (
    <div>
      <Calendar searchParams={searchParams} />
      <Navbar />
    </div>
  );
}
