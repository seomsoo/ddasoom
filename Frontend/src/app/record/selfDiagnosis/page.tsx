import Link from 'next/link';

import Header from '@/components/Common/Header';
import Ddasomi from '@/svgs/shadowDdasomi.svg';

export default function SelfDiagnosisPage() {
  return (
    <div>
      <Header label="자가진단" />
      <main className="flex flex-col">
        <section className="flex flex-col justify-center items-center gap-5 mt-14">
          <h3 className="font-hakgyoansimR text-2xl text-center">
            보건복지부 국립건강센터 <br />
            공황장애 진단 기준에 따른 <br /> 자가진단입니다.
          </h3>
          <p className="text-xs">총 13문항으로, 다음 중 나타난 증상을 모두 골라주세요.</p>
          <Ddasomi className="mt-4" />
        </section>

        <Link
          href="/record/selfDiagnosis/check"
          className="font-nanumBold text-xl w-full py-3 mt-10 rounded-3xl text-main3 text-center bg-button1">
          시작하기
        </Link>
      </main>
    </div>
  );
}
