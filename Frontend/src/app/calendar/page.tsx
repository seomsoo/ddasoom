import React from 'react';

import Calendar from '@/components/Calendar/Calendar';
import Navbar from '@/components/Navbar';
export default function calendar() {
  return (
    <div>
      <Calendar />
      {/* 공황 일지 */}
      {/* 생활 기록 */}
      <Navbar />
    </div>
  );
}
