import React from 'react';

interface BreathStageDisplayProps {
  sequence: { description: string; duration: number }[];
  currentStage: number;
}

const BreathStageDisplay: React.FC<BreathStageDisplayProps> = ({ sequence, currentStage }) => (
  <div className="flex justify-center gap-4 mt-4">
    {sequence.map((stage, index) => (
      <div key={index} className="text-center font-hakgyoansimR p-2 rounded-full">
        <p className={index === currentStage ? 'font-bold text-main1' : ''}>{stage.description}</p>
        <p className={index === currentStage ? 'font-bold text-main1' : ''}>{`${stage.duration / 1000}초`}</p>
      </div>
    ))}
  </div>
);

export default BreathStageDisplay;
