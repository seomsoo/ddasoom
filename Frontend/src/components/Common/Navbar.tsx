'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import background from '@/components/BackGround/Background.module.css';
import NavIcon1 from '@/svgs/navIcon1.svg';
import NavIcon2 from '@/svgs/navIcon2.svg';
import NavIcon2CenterGIF from '@/videos/EyeMouse.gif';
import NavIcon1GIF from '@/videos/navIcon1G.gif';
import NavIcon2GIF from '@/videos/navIcon2G.gif';
import NavIconCenterGIF from '@/videos/navIconCenter.gif';

export default function Navbar() {
  const pathname = usePathname(); // 현재 경로 확인

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] bg-[#9fd69d] rounded-t-[30px] h-20 p-4 flex justify-between items-center z-30">
      <Link href="/training">
        {pathname === '/training' ? (
          <img
            src={NavIcon1GIF.src}
            className="w-[42px] h-[41px] mb-1 ml-9 transition-opacity duration-300 ease-in-out opacity-100 animate-grow"
            alt="Nav Icon GIF"
          />
        ) : (
          <NavIcon1 className="w-10 h-10 ml-10 transition-opacity duration-300 ease-in-out opacity-80" />
        )}
      </Link>

      <Link href="/main">
        <div
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.2)',
          }}
          className={`${background.background5} absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-[30px] overflow-hidden `}>
          <img
            src={pathname === '/main' ? NavIconCenterGIF.src : NavIcon2CenterGIF.src}
            className="w-28 h-28 translate-y-3 transition-transform duration-300 ease-in-out "
            alt="Nav Center Icon GIF"
          />
        </div>
      </Link>

      <Link href="/record">
        {pathname === '/record' ? (
          <img
            src={NavIcon2GIF.src}
            className="w-[40px] h-[41px] mb-1 mr-10 transition-opacity duration-300 ease-in-out opacity-100 animate-grow"
            alt="Nav Icon GIF"
          />
        ) : (
          <NavIcon2 className="w-10 h-10 mb-1 mr-10 transition-opacity duration-300 ease-in-out opacity-80" />
        )}
      </Link>
    </div>
  );
}
