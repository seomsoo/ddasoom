'use client';

import { useRouter } from 'next/navigation';

export default function RecodingContent() {
  const router = useRouter();

  const goToRecodingPage = () => {
    router.push('/main/setting/recoding');
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">목소리 설정</h2>
      <main>
        <span>목소리 목록</span>
      </main>
      <section className="flex text-nowrap">
        <button onClick={goToRecodingPage} className="bg-main4 p-4 px-4 rounded-full w-full">
          <span>녹음하기</span>
        </button>
      </section>
    </div>
  );
}
