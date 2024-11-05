import Link from 'next/link';

import Navbar from '@/components/Navbar';
import DdasomiSvg from '@/svgs/ddasomi.svg';
import SunglassDasomiSvg from '@/svgs/sunglassDdasomi.svg';

export default function Training() {
  return (
    <div className="flex flex-col inset-0 items-center mt-16 relative">
      <div className="relative w-full flex ml-6">
        <DdasomiSvg className="absolute -top-14 w-32 h-32 z-0 " />
      </div>
      <Link
        href="/training/breath"
        className="flex ml-8 mt-7 bg-main4 border border-r-0 border-main1 shadow-md rounded-l-2xl w-full max-w-md p-4 py-7 mb-4 z-10">
        <div className="flex flex-col gap-4 ml-2">
          <h2 className="text-3xl font-nanumBold">호흡 연습</h2>
          <p className="text-sm">
            세 가지 호흡법 중 <br />
            나에게 맞는 방법을 골라 연습해보세요.
          </p>
        </div>
      </Link>

      <Link
        href="/training/grounding"
        className="flex mr-8 items-start mt-8 border-l-0 bg-main4 border border-main1 shadow-md rounded-r-2xl w-full max-w-md p-4 py-7 mb-4 z-10">
        <div className="flex flex-col gap-4 text-right ml-20 relative">
          <h2 className="text-3xl font-nanumBold">그라운딩</h2>
          <div className="absolute -top-5 -left-[120px]  transform rotate-12">
            <DdasomiSvg className="w-32 h-32 z-2" />
          </div>
          <div className="text-sm">
            <p className="mr-1">감각에 집중하여</p>
            <p> 지금 이 순간을 온전히 느껴보세요.</p>
          </div>
        </div>
      </Link>

      <div className="relative w-full flex z-0">
        <SunglassDasomiSvg alt="DdasomiSvg" className="absolute w-32 h-32 -top-7 -right-2 z-0" />
      </div>
      <Link
        href="/training/calmDown"
        className="flex ml-8 mt-8 bg-main4 border border-r-0 border-main1 shadow-md rounded-l-2xl w-full max-w-md p-4 py-7 mb-4 z-10">
        <div className="flex flex-col gap-4 ml-2">
          <h2 className="text-3xl font-nanumBold">안정화 기법</h2>
          <p className="text-sm">
            자연의 움직임을 보며 <br />
            긴장된 마음과 몸을 풀어보세요.
          </p>
        </div>
      </Link>
      <Navbar />
    </div>
  );
}
