import BreathCircle from '@/components/Training/Breath/BreathCircle';

type BreathPageProps = {
    params: {
      breathType: 'shortTime' | 'basicTime' | 'longTime';
    };
  };

export default function BreathPage({ params }: BreathPageProps) {
  return <BreathCircle breathType={params.breathType} />;
}
