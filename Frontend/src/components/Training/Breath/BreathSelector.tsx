'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import three from '/public/images/3.png';
import four from '/public/images/4.png';
import five from '/public/images/5.png';
import seven from '/public/images/7.png';
import eight from '/public/images/8.png';

export default function BreathSelector() {
  const router = useRouter();

  const handleBreathSelect = (breathType: string) => {
    router.push(`/training/breath/${breathType}`);
  };

  return (
    <div className="flex flex-col font-nanumBold  text-main4 mt-12 text-xl space-y-7 w-64  ">
      <button onClick={() => handleBreathSelect('basicTime')} className="flex items-center justify-between py-5 text-left  bg-[#8ad1b6]   rounded-2xl">
        <span className="ml-7">
          기본 호흡
          <div className='flex w-10'>
            <Image src={four} alt='four'/>
            <Image src={seven} alt='seven'/>
            <Image src={eight} alt='eight'/>        
          </div> 
        </span>
      </button>
      <button
        onClick={() => handleBreathSelect('shortTime')}
        className="flex z-10 items-center justify-between py-5 text-left  bg-[#94b3f6]  rounded-2xl">
        <span className="ml-7">
          짧은 호흡
          <div className='flex w-10'>
            <Image src={four} alt='four'/>
            <Image src={four} alt='four'/>     
            <Image src={four} alt='four'/> 
            <Image src={four} alt='four'/>            
          </div> 
        </span>
      </button>
      <button
        onClick={() => handleBreathSelect('longTime')}
        className="flex items-center justify-between py-5 z-10 text-left  bg-[#e6d271]   rounded-2xl">
        <span className="ml-7">
          긴 호흡
          <div className='flex w-10'>
            <Image src={five} alt='five'/>
            <Image src={seven} alt='seven'/>
            <Image src={three} alt='three'/>          
          </div> 
        </span>
      </button>
    </div>
  );
}
