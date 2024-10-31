import Link from 'next/link';

import DdasomiSvg from '@/asset/Svg/ddasomi.svg';
import SunglassDasomiSvg from '@/asset/Svg/sunglassDdasomi.svg';
import Navbar from '@/components/Navbar';

export default function Training() {
  return (
    <div className="flex flex-col inset-0 h-screen  items-center mt-11 max-h-screen relative">
      <div className="relative w-full flex ml-6">
        <DdasomiSvg className="absolute -top-14 w-32 h-32 z-0 " />
      </div>
      <div className="flex ml-8 mt-7 bg-main4 border border-r-0 border-main1 shadow-md rounded-l-2xl w-full max-w-md p-4 py-6 mb-4 z-10">
        <Link href="/training/breath">
          <div className="flex flex-col gap-2 ml-2">
            <h2 className="text-3xl font-nanumBold">호흡 연습</h2>
            <p className="text-sm">
              세 가지 호흡법 중 <br />
              나에게 맞는 방법을 골라 연습해보세요.
            </p>
          </div>
        </Link>
      </div>

      <div className="flex mr-8 items-start mt-7 border-l-0 bg-main4 border border-main1 shadow-md rounded-r-2xl w-full max-w-md p-4 py-6 mb-4 z-10">
        <Link href="/training/grounding">
          <div className="flex flex-col gap-2 text-right ml-20 relative">
            <h2 className="text-3xl font-nanumBold">그라운딩</h2>
            <div className="absolute -top-6 -left-[120px]  transform rotate-12">
              <DdasomiSvg className="w-32 h-32 z-2" />
            </div>
            <div className="text-sm">
              <p className="mr-1">감각에 집중하여</p>
              <p> 지금 이 순간을 온전히 느껴보세요.</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="relative w-full flex z-0">
        <SunglassDasomiSvg alt="DdasomiSvg" className="absolute w-32 h-32 -top-8 -right-2 z-0" />
      </div>
      <div className="flex ml-8 mt-7 bg-main4 border border-r-0 border-main1 shadow-md rounded-l-2xl w-full max-w-md p-4 py-6 mb-4 z-10">
        <Link href="/training/calmDown">
          <div className="flex flex-col gap-2 ml-2">
            <h2 className="text-3xl font-nanumBold">안정화 기법</h2>
            <p className="text-sm">
              자연의 움직임을 보며 <br />
              긴장된 마음과 몸을 풀어보세요.
            </p>
          </div>
        </Link>
      </div>

      <Navbar />
    </div>
  );
}
