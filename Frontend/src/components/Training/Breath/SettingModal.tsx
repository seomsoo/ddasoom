'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ComponentType } from 'react';
import Cancel from '@/svgs/cancel.svg';

interface ModalWithStateProps {
  ContentComponent: ComponentType;
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingModal({ ContentComponent, isOpen, onClose }: ModalWithStateProps) {
  if (!isOpen) return null;
  console.log('ContentComponent:', ContentComponent);

  return (
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
            <button onClick={onClose} className="absolute top-5 right-5">
              <Cancel />
            </button>
            <div className="max-h-[60vh] overflow-y-auto">
              <ContentComponent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
