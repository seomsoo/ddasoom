'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, ComponentType } from 'react';

import Cancel from '@/svgs/cancel.svg';
import Help from '@/svgs/Help.svg';

interface ModalWithStateProps {
  ContentComponent: ComponentType;
}

export default function HelpModal({ ContentComponent }: ModalWithStateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openModal} className="flex justify-center">
        <Help />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
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
              <button onClick={closeModal} className="absolute top-2 right-2">
                <Cancel />
              </button>
              <div className="max-h-[60vh] overflow-y-auto">
                <ContentComponent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
