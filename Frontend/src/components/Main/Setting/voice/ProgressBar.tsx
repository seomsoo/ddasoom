interface ProgressBarProps {
  currentLine: number;
  totalLines: number;
}

export default function ProgressBar({ currentLine, totalLines }: ProgressBarProps) {
  // 첫 두 줄을 제외한 진행 상태를 반영
  const adjustedProgress = ((currentLine - 1) / (totalLines - 3)) * 100; // 마지막까지 채워지도록 -3

  return (
    <div className="w-60 h-2 bg-[#bcebfffb] rounded relative overflow-hidden">
      <div
        className="h-full bg-[#4cb5cf] transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, adjustedProgress))}%` }}
      />
    </div>
  );
}
