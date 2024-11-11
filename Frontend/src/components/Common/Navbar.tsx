'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

import Ddasomi from '@/svgs/ddasomi.svg';
import NavIcon1 from '@/svgs/navIcon1.svg';
import NavIcon2 from '@/svgs/navIcon2.svg';
import NavIcon1GIF from '@/videos/navIcon1G.gif';
import NavIcon2GIF from '@/videos/navIcon2G.gif';

export default function Navbar() {
  const pathname = usePathname(); // 현재 경로 확인

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] bg-main1 rounded-t-[30px] h-20 p-4 flex justify-around items-center z-10">
      <Link href="/training">
        {pathname === '/training' ? (
          <img src={NavIcon1GIF.src} className="w-[37px] h-[37px] mb-1 mr-2" alt="Nav Icon GIF" />
        ) : (
          <NavIcon1 className="w-10 h-10 mr-10" />
        )}
      </Link>

      <Link href="/main">
        <div
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)',
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-main2 rounded-[30px] overflow-hidden">
          <Ddasomi className="w-28 h-28 translate-y-4 -translate-x-1.5" />
        </div>
      </Link>

      <Link href="/record">
        {pathname === '/record' ? (
          <img src={NavIcon2GIF.src} className="w-[38px] h-[41px] mb-1 m1-8" alt="Nav Icon GIF" />
        ) : (
          <NavIcon2 className="w-10 h-10 mb-1 ml-8" />
        )}
      </Link>
    </div>
  );
}
