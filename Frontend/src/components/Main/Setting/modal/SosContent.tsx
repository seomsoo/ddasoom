'use client';

export default function ConnectContent() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-1">비상 연락처</h2>
      <p className="text-sm opacity-50 text-center">
        공황발작 10분 이상 경과시,
        <br /> 설정한 연락처로 긴급 메세지가 전송됩니다.
      </p>
    </div>
  );
}
