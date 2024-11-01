'use client';
import { useRouter } from 'next/navigation';

import Fire from '@/svgs/modakbul.svg';
import Wind from '@/svgs/windIcon.svg';

export default function VideoSelector() {
  const router = useRouter();

  const handleVideoSelect = (videoType: string) => {
    router.push(`/training/calmDown/${videoType}`);
  };

  return (
    <div className="flex flex-col font-nanumBold  text-main4 mt-12 text-xl space-y-7 w-64  ">
      <button className="flex items-center justify-between py-5 text-left  bg-[#8ad1b6]   rounded-2xl">
        <span className="ml-7">
          따솜이 세기
          <p className="text-sm mt-3 text-[#04b471] font-hakgyoansimR">
            지나가는 <br />
            따솜이를 세보아요
          </p>
        </span>
        <Fire className="mr-5" />
      </button>
      <button
        onClick={() => handleVideoSelect('fireplace')}
        className="flex z-10 items-center justify-between py-5 text-left  bg-[#e68671]  rounded-2xl">
        <span className="ml-7">
          불멍{' '}
          <p className="text-sm mt-3 text-sub3 font-hakgyoansimR">
            모닥불을 보면서 <br />
            따뜻함을 느껴봐요
          </p>
        </span>
        <Fire className="mr-5" />
      </button>
      <button
        onClick={() => handleVideoSelect('wind')}
        className="flex items-center justify-between py-5 z-10 text-left  bg-[#7d92ee]   rounded-2xl">
        <span className="ml-7">
          바람쐬기
          <p className="text-sm mt-3 text-[#2a4ef1] font-hakgyoansimR">
            바람을 쐬면서
            <br />
            머리를 식혀봐요
          </p>
        </span>
        <Wind className="mr-5" />
      </button>
    </div>
  );
}
