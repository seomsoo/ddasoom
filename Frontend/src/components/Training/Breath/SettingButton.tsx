'use client';
import React from 'react';

import SettingSvg from '@/svgs/setting.svg';

interface SettingButtonProps {
  onClick: () => void;
}

export default function SettingButton({ onClick }: SettingButtonProps) {
  return (
    <button onClick={onClick}>
      <SettingSvg />
    </button>
  );
}
