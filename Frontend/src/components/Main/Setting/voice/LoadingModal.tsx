'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

import Cancel from '@/svgs/cancel.svg';
import Loading from '@/videos/loading.gif';

export default function LoadingModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

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
              <button onClick={closeModal} className="absolute z-10 top-4 right-5">
                <Cancel />
              </button>
              <div className="max-h-[60vh] min-h-[30vh]">
                <div className=" relative flex flex-col items-center">
                  <span className="text-xl font-hakgyoansimR text-center mt-16">
                    따뜻한 목소리를 담아내고 있습니다. <br />
                    잠시만 기다려 주세요.
                  </span>
                  <Image src={Loading} className="w-24 h-24 " alt="Loading" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
