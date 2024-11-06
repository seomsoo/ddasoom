import Header from '@/components/Report/Header';
import MainContent from '@/components/Report/MainContent';

interface ReportPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default function ReportPage({ searchParams }: ReportPageProps) {
  const year = searchParams.year || new Date().getFullYear().toString();
  const month = searchParams.month || (new Date().getMonth() + 1).toString().padStart(2, '0');

  return (
    <>
      <Header year={year} month={month} />
      <MainContent year={year} month={month} />
    </>
  );
}
