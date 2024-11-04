import { BreathData } from '@/types/BreathDataTypes';

const breathData: Record<'shortTime' | 'basicTime' | 'longTime', BreathData> = {
  shortTime: {
    type: 'shortTime',
    stages: [
      { duration: 4000, description: '들이마시기' },
      { duration: 4000, description: '참기' },
      { duration: 4000, description: '내쉬기' },
      { duration: 4000, description: '참기' },
    ],
  },
  basicTime: {
    type: 'basicTime',
    stages: [
      { duration: 4000, description: '들이마시기' },
      { duration: 7000, description: '참기' },
      { duration: 8000, description: '내쉬기' },
    ],
  },
  longTime: {
    type: 'longTime',
    stages: [
      { duration: 5000, description: '들이마시기' },
      { duration: 7000, description: '내쉬기' },
      { duration: 3000, description: '참기' },
    ],
  },
};
    
export default breathData;
    
