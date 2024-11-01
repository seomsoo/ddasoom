export default function SummaryBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.1)',
      }}
      className="relative rounded-3xl bg-main4 py-10 mt-3 px-5">
      {children}
    </div>
  );
}
