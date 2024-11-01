import Header from '@/components/Header';
import CheckList from '@/components/Record/SelfDiagnosis/CheckList';

export default function SelfDiagnosisDetailPage() {
  return (
    <div>
      <Header label="자가진단" />
      <CheckList />
    </div>
  );
}
