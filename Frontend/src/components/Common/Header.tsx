'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import BackIcon from '@/svgs/BackIcon';

interface HeaderProps {
  label: string;
  color?: string;
}

export default function Header({ label, color = '#262626' }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center relative mb-6">
      <div className="cursor-pointer absolute left-2" onClick={() => router.back()}>
        <BackIcon color={color} />
      </div>
      <span className="text-center text-xl font-hakgyoansimR">{label}</span>
    </div>
  );
}
