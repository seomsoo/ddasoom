interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full flex justify-center mb-4">
      <div className="w-52 bg-gray2 rounded-full h-1.5">
        <div className="bg-main2 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}