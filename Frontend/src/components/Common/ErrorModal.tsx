'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import Cancel from '@/svgs/cancel.svg';

interface ErrorModalProps {
  onClose: () => void;
  onRetry: () => void;
  context: string;
}

export default function ErrorModal({ onClose, onRetry, context }: ErrorModalProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.back();
  };

  const handleMoveHome = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'LOGOUT',
        content: null,
      }),
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-nanumRegular">
      {/* 어두운 배경 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* 모달 박스 */}
      <div className="relative bg-white p-8 rounded-2xl shadow-lg z-50 max-w-xs mx-auto text-center">
        <div className="flex justify-end">
          <button onClick={handleClose}>
            <Cancel />
          </button>
        </div>

        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <p className="text-gray-700 text-lg mb-6">
          일시적인 오류가 발생했습니다. <br /> 잠시 후 다시 시도해주세요.
        </p>
        <div>
          에러 내용 :<span>{context}</span>
        </div>

        {context.includes('Network') ? (
          <button
            onClick={handleMoveHome}
            className="bg-button1 text-black text-lg font-nanumBold py-2 px-8 rounded-full">
            홈으로
          </button>
        ) : (
          <button onClick={onRetry} className="bg-yellow-300 text-black text-lg font-nanumBold py-2 px-8 rounded-full">
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
