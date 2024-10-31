'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import BackIcon from '@/asset/Svg/backIcon.svg';

interface HeaderProps {
  label: string;
  hasBackButton?: boolean;
}

export default function Header({ label, hasBackButton = true }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center relative mb-6">
      {hasBackButton && <BackIcon className="cursor-pointer absolute left-2" onClick={() => router.back()} />}
      <span className="text-center text-xl font-hakgyoansimR">{label}</span>
    </div>
  );
}
