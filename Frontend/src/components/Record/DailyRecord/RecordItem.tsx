import React from 'react';

interface RecordItemProps {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isSelected: boolean;
  onClick: () => void;
}

export default function RecordItem({ label, Icon, isSelected, onClick }: RecordItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        onClick={onClick}
        className={`cursor-pointer rounded-full p-4 transition-all duration-0 shadow-[0px_6px_10px_rgba(0,0,0,0.25)] ${
          isSelected ? 'border border-1 border-main1' : 'border border-1 border-main4'
        }`}
        style={{
          backgroundColor: isSelected ? 'rgba(182, 216, 154, 0.3)' : 'rgb(248, 252, 246)',
        }}>
        <Icon className={`${isSelected ? 'text-main1' : 'text-gray4'}`} />
      </div>
      <p className="text-center text-sm mt-2">{label}</p>
    </div>
  );
}
