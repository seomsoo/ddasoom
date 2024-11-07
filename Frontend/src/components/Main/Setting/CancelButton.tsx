'use client';
import { useRouter } from 'next/navigation';

import Cancel from '@/svgs/cancel.svg';

export default function CancelButton() {
  const router = useRouter();

  return <Cancel onClick={() => router.back()} className="cursor-pointer" />;
}
