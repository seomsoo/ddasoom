import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Ddasomi from '@/asset/Svg/ddasomi.svg';
import NavIcon1 from '@/asset/Svg/navIcon1.svg';
import NavIcon2 from '@/asset/Svg/navIcon2.svg';

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] bg-main1 rounded-t-[30px] h-20 p-4 flex justify-around items-center">
      <Link href="/training">
        <NavIcon1 className="w-10 h-10 mr-10" />
      </Link>

      <Link href="/main">
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-main2 rounded-[30px] overflow-hidden shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
          <Ddasomi className="w-28 h-28 translate-y-4 -translate-x-1" />
        </div>
      </Link>

      <Link href="/calendar">
        <NavIcon2 className="w-10 h-10" />
      </Link>
    </div>
  );
}
