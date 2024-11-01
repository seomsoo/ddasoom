import Navbar from '@/components/Navbar';
import Calendar from '@/components/Record/Calendar/Calendar';

export default function RecordPage({ searchParams }: SearchParamsProps) {
  return (
    <div>
      <Calendar searchParams={searchParams} />
      <Navbar />
    </div>
  );
}
