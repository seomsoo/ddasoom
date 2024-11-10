'use client';

import { useState, useEffect } from 'react';

export default function WindowAnimation() {
  const [currentSvg, setCurrentSvg] = useState('/svgs/Day.svg'); // 초기값으로 Day 설정

  useEffect(() => {
    const updateSvg = () => {
      const hour = new Date().getHours();

      if (hour >= 6 && hour < 16) {
        setCurrentSvg('/svgs/Day.svg'); // 오전 6시부터 오후 4시까지 Day
      } else if (hour >= 16 && hour < 19) {
        setCurrentSvg('/svgs/Sunset.svg'); // 오후 4시부터 저녁 7시까지 Sunset
      } else {
        setCurrentSvg('/svgs/Night.svg'); // 저녁 7시부터 오전 6시까지 Night
      }
    };

    updateSvg();
    const interval = setInterval(updateSvg, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <img src={currentSvg} alt="Time of Day" className="w-36 h-36 relative transition-all duration-1000" />
    </>
  );
}
