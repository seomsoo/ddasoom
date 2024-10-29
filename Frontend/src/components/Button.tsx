import React from 'react';

interface ButtonProps {
  label: string; // 필수
  className?: string; // 선택적
  disabled?: boolean; // 선택적
  onClick?: () => void; // 선택적
}

export default function Button({ label, className = '', disabled = false, onClick }: ButtonProps) {
  return (
    <button
      className={`font-nanumBold text-xl w-full py-3 rounded-3xl text-main3 
        ${disabled ? 'bg-button1 opacity-50' : 'bg-button1 '}
        ${className}`}
      disabled={disabled}
      onClick={onClick} // onClick 이벤트 추가
    >
      {label}
    </button>
  );
}
