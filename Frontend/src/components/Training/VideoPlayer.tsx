// src/components/VideoPlayer.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Cancel from '@/asset/Svg/cancel.svg';
import SoundOff from '@/asset/Svg/soundOff.svg';
import SoundOn from '@/asset/Svg/soundOn.svg';
import { videoData } from '@/components/Training/VideoData';

type VideoPlayerProps = {
  videoType: keyof typeof videoData;
};

export default function VideoPlayer({ videoType }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [visibleText, setVisibleText] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const router = useRouter();
  const data = videoData[videoType];

  useEffect(() => {
    setTimeout(() => {
      setVisibleText(data.introText);
      setAnimationClass('animate-fadein');
    }, 500);

    setTimeout(() => {
      setAnimationClass('animate-fadeout');
    }, 3000);

    setTimeout(() => {
      setVisibleText(data.focusText);
      setAnimationClass('animate-fadein');
    }, 4500);

    setTimeout(() => {
      setAnimationClass('animate-fadeout');
    }, 7000);
  }, [data.introText, data.focusText]);

  const handleSoundToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleCancel = () => {
    router.push('/training/result');
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {data.type === 'video' && data.src ? (
        <video
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full -z-10"
          autoPlay
          loop
          muted={isMuted}
          src={data.src}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-main4">
          <span>{data.introText}</span>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center text-main4 text-3xl font-hakgyoansimR">
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

      {data.type === 'video' && (
        <button onClick={handleSoundToggle} className="absolute top-10 left-8 z-10">
          {isMuted ? <SoundOff /> : <SoundOn />}
        </button>
      )}

      <button onClick={handleCancel} className="absolute top-9 right-8 z-10">
        <Cancel />
      </button>
    </div>
  );
}
