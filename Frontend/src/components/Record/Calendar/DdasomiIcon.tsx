import GreenSomi from '@/svgs/greenSomi.svg';
import OrangeSomi from '@/svgs/orangeSomi.svg';
import YellowSomi from '@/svgs/yellowSomi.svg';

interface DdasomiIconProps {
  trainingCount: number;
}

export default function DdasomiIcon({ trainingCount }: DdasomiIconProps) {
  switch (trainingCount) {
    case 1:
      return <YellowSomi className="w-10 h-10 mt-2" />;
    case 2:
      return <OrangeSomi className="w-10 h-10 mt-2" />;
    case 3:
      return <GreenSomi className="w-10 h-8 ml-1 mb-1" />;
    default:
      return null;
  }
}
