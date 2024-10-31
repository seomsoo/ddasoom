'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

import Header from '@/components/Header';

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 특정 경로에 따라 hasBackButton을 false로 설정
  const hasBackButton = pathname !== '/calendar/selfDiagnosis/result';

  return (
    <div>
      <Header label="자가진단" hasBackButton={hasBackButton} />
      {children}
    </div>
  );
}

export default Layout;
