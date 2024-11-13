'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import three from '/public/images/3.png';
import four from '/public/images/4.png';
import five from '/public/images/5.png';
import seven from '/public/images/7.png';
import eight from '/public/images/8.png';
import Dot from '/public/images/dot2.png';

export default function BreathSelector() {
  const router = useRouter();
  const [selectedBreathType, setSelectedBreathType] = useState('');

  useEffect(() => {
    if (!selectedBreathType) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          title: 'BREATH',
          content: null,
        }),
      );
    }
  }, [selectedBreathType]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        const messageData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const { title, content } = messageData;

        if (title === 'BREATH' && content && content !== selectedBreathType) {
          setSelectedBreathType(content);
        }
      } catch (e) {
        console.error('Failed to handle message:', e);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [selectedBreathType]);

  const handleBreathSelect = (breathType: string) => {
    router.push(`/training/breath/${breathType}`);
  };

  return (
    <div className="flex flex-col font-nanumBold  text-main4 mt-12  space-y-7 w-72  ">
      <button
        onClick={() => handleBreathSelect('basicTime')}
        className={`flex py-5 text-left bg-[#f3b6c0] rounded-2xl ${
          selectedBreathType === 'basicTime' ? 'border-2 border-red-500 py-4' : ''
        }`}>
        <div className="flex w-full flex-col  ">
          <div className=" flex justify-center gap-3">
            <Image
              className="w-12 h-14 filter sepia-[0.2] hue-rotate-[280deg] brightness-[1.1]"
              src={four}
              alt="four"
            />
            <Image className="w-2 h-3 mt-6 " src={Dot} alt="dot" />
            <Image className="w-12 h-14 filter sepia-[0.2]  brightness-[1.1]" src={seven} alt="seven" />
            <Image className="w-2 h-3 mt-6 " src={Dot} alt="dot" />
            <Image
              className="w-12 h-14 filter saturate-[3.2] hue-rotate-[40deg]  sepia-[0.3]  brightness-[1.4]"
              src={eight}
              alt="eight"
            />
          </div>

          <span className="mt-3 flex justify-center opacity-85">- 기본 호흡</span>
        </div>
      </button>
      <button
        onClick={() => handleBreathSelect('shortTime')}
        className={`flex items-center justify-between py-5 z-10 text-left bg-[#f37f85] rounded-2xl ${
          selectedBreathType === 'longTime' ? 'border-2 border-red-500 py-4' : ''
        }`}>
        <div className="flex w-full flex-col  ">
          <div className=" flex justify-center gap-2 filter saturate-[3.2] hue-rotate-[300deg]  sepia-[0.3]  brightness-[1.1]">
            <Image className="w-11 h-14" src={four} alt="four" />
            <Image className="w-2 h-3 mt-6 " src={Dot} alt="dot" />
            <Image className="w-11 h-14" src={four} alt="four" />
            <Image className="w-2 h-3 mt-6 " src={Dot} alt="dot" />
            <Image className="w-11 h-14" src={four} alt="four" />
            <Image className="w-2 h-3 mt-6 " src={Dot} alt="dot" />
            <Image className="w-11 h-14" src={four} alt="four" />
          </div>

          <span className="mt-3 flex justify-center opacity-85">- 짧은 호흡</span>
        </div>
      </button>
      <button
        onClick={() => handleBreathSelect('longTime')}
        className={`flex items-center justify-between py-5 z-10 text-left bg-[#8989b3] rounded-2xl ${
          selectedBreathType === 'longTime' ? 'border-2 border-red-500 py-4' : ''
        }`}>
        <div className="flex w-full flex-col  ">
          <div className=" flex justify-center gap-3">
            <Image
              className="w-11 h-14  filter invert-[0.1] sepia-[0.5] hue-rotate-[90deg] brightness-[1.4]"
              src={five}
              alt="five"
            />
            <Image className="w-2 h-3 mt-6 " src={Dot} alt="dot" />
            <Image
              className="w-12 h-14 filter invert-[0.1] sepia-[0.5] hue-rotate-[200deg] brightness-[2.3]"
              src={seven}
              alt="seven"
            />
            <Image className="w-2 h-3 mt-6 " src={Dot} alt="dot" />
            <Image
              className="w-12 h-14 filter  hue-rotate-[155deg]  sepia-[0.3]  brightness-[1.1]"
              src={three}
              alt="three"
            />
          </div>

          <span className="mt-3 flex justify-center opacity-85">- 긴 호흡</span>
        </div>
      </button>
    </div>
  );
}
