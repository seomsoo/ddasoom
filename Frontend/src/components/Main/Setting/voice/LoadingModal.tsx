'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Loading from '@/videos/loading.gif';

export default function LoadingModal() {
  const [isOpen, setIsOpen] = useState(true); // 모달이 열려 있는 상태로 초기화
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false);
    router.push('/main/setting'); // 버튼 클릭 시 해당 경로로 이동
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <motion.div
              className="relative bg-white p-6 rounded-3xl w-[90%] max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}>
              <div className="max-h-[60vh] min-h-[30vh]">
                <div className="relative flex flex-col items-center">
                  <span className="text-xl font-hakgyoansimR text-center mt-5">
                    따뜻한 목소리를 담아내고 있습니다. <br />
                    설정으로 돌아가 잠시만 기다려 주세요.
                  </span>
                  <span className="text-xs mt-1 text-gray4 font-nanumBold">(약 40초 소요)</span>
                  <Image src={Loading} className="w-24 h-24 " alt="Loading" />
                  <button onClick={closeModal} className="px-20 rounded-full py-2 bg-button1 text-white font-nanumBold">
                    <span>확인</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
