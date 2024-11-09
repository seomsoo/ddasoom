// components/ModalWithState.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ComponentType, useState } from 'react';

import Cancel from '@/svgs/cancel.svg';
import Enter from '@/svgs/enterIcon.svg';

interface ModalWithStateProps {
  label: string;
  ContentComponent: ComponentType<{ closeModal: () => void }>;
}

export default function ModalWithState({ label, ContentComponent }: ModalWithStateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-main4 p-5 rounded-full flex justify-between text-left font-nanumBold w-full">
        <span>{label}</span>
        <Enter />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <motion.div
              className="bg-white p-6 rounded-3xl w-11/12 max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}>
              <button onClick={closeModal} className="flex w-full justify-end">
                <Cancel />
              </button>
              <div className="max-h-[60vh] overflow-y-auto">
                <ContentComponent closeModal={closeModal} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
