'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import BackIcon from '@/asset/Svg/backIcon.svg';

export default function Header({ label }: { label: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center relative mb-6">
      <Image
        src={BackIcon}
        alt="back"
        className="cursor-pointer absolute left-2"
        onClick={() => router.back()}
      />
      <span className="text-center text-xl font-hakgyoansimR ">{label}</span>
    </div>
  );
}
