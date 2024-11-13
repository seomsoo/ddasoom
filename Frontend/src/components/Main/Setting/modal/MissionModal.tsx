'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ComponentType, useState } from 'react';

import Mission from '@/svgs/Mission.svg';

interface ModalWithStateProps {
  ContentComponent: ComponentType;
}

export default function HelpModal({ ContentComponent }: ModalWithStateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openModal}>
        <Mission className="shadow-lg transform transition duration-75 active:translate-y-1 active:shadow-none" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <motion.div
              className="relative bg-white py-6 rounded-3xl w-[90%] max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}>
              <div className="absolute -top-2 right-12 flex gap-5">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-gray-200 rounded-sm shadow-md"
                    style={{ borderTop: '2px solid #ddd' }}
                  />
                ))}
              </div>

              <div className="max-h-[70vh]">
                <ContentComponent />
                <button onClick={closeModal} className="flex mt-5 items-center justify-center w-full ">
                  <span className="px-24 py-2 bg-button1 text-main4 text-lg rounded-full">확인</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
