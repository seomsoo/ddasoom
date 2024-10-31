'use client';
import { useEffect, useRef, useState } from 'react';

import Cancel from '@/asset/Svg/cancel.svg';
import SoundOff from '@/asset/Svg/soundOff.svg';
import SoundOn from '@/asset/Svg/soundOn.svg';

export default function FirePlacePage() {
  const [hasWindow, setHasWindow] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    // 첫 번째 텍스트가 서서히 나타나도록 설정
    setTimeout(() => {
      setVisibleText('상단의 소리를 키우고');
      setAnimationClass('animate-fadein');
    }, 500);

    // 첫 번째 텍스트가 서서히 사라지도록 설정
    setTimeout(() => {
      setAnimationClass('animate-fadeout');
    }, 3000);

    // 두 번째 텍스트가 첫 번째 텍스트가 사라진 후 서서히 나타나도록 설정
    setTimeout(() => {
      setVisibleText('화면과 소리에 집중해주세요');
      setAnimationClass('animate-fadein');
    }, 4500);

    // 두 번째 텍스트도 서서히 사라지도록 설정
    setTimeout(() => {
      setAnimationClass('animate-fadeout');
    }, 7000);
  }, []);

  const handleSoundToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {hasWindow && (
        <video
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full -z-10"
          autoPlay
          loop
          muted={isMuted}
          src={require('../../../../asset/Video/wind.mp4')}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-hakgyoansimR">
        <span
          style={{
            backgroundImage: 'linear-gradient(to top, #ffffff, #EBF4E3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 4px 2px rgba(0, 0, 0, 0.3)',
          }}
          className={`mb-80 ${animationClass}`}>
          {visibleText}
        </span>
      </div>
      <button onClick={handleSoundToggle} className="absolute top-10 left-8 z-10">
        {isMuted ? <SoundOff /> : <SoundOn />}
      </button>
      <button className="absolute  right-8 z-10">
        <Cancel />
      </button>
    </div>
  );
}
