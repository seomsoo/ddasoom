'use client';
import { useRouter } from 'next/navigation';

import Fire from '@/asset/Svg/modakbul.svg';

export default function VideoSelector() {
  const router = useRouter();

  const handleVideoSelect = (videoType: string) => {
    router.push(`/training/calmDown/${videoType}`);
  };

  return (
    <div className="flex flex-col font-nanumBold  text-main4 mt-12 text-[26px] space-y-7 w-64  ">
      <button className="flex items-center justify-between py-2 text-left  bg-[#8ad1b6] border-sub5 border-2  rounded-2xl">
        <span className="ml-7">
          따솜이 <br /> 세우기
        </span>
        <Fire className="mr-5" />
      </button>
      <button
        onClick={() => handleVideoSelect('fireplace')}
        className="flex items-center justify-between py-2 text-left  bg-[#e68671] border-sub3 border-2  rounded-2xl">
        <span className="ml-7">불멍</span>
        <Fire className="mr-5" />
      </button>
      <button
        onClick={() => handleVideoSelect('wind')}
        className="flex items-center justify-between py-2 z-10 text-left  bg-[#7d92ee] border-sub4 border-2  rounded-2xl">
        <span className="ml-7">바람쐬기</span>
        <Fire className="mr-5" />
      </button>
    </div>
  );
}
