export type BreathStage = {
    duration: number;
    description: string;
  };
  
export type BreathData = {
    type: 'shortTime' | 'basicTime' | 'longTime';
    stages: BreathStage[];
  };
  

