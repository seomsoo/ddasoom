export default function DiaryItem({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex flex-col items-center">
      <p>{label}</p>
      <span>{count}</span>
    </div>
  );
}
