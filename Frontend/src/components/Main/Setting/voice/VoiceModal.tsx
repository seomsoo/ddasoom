'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ComponentType, useState } from 'react';

interface ModalWithStateProps {
  ContentComponent: ComponentType<VoiceContentProps>;
  voiceName: string;
  setVoiceName: (value: string) => void;
}

interface VoiceContentProps {
  voiceName: string;
  setVoiceName: (value: string) => void;
}

export default function VoiceModal({ ContentComponent, voiceName, setVoiceName }: ModalWithStateProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleSaveAndClose = () => {
    setIsOpen(false);
  };

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
            <div className="max-h-[60vh] flex flex-col items-center">
              {/* ContentComponent에 필요한 props 전달 */}
              <ContentComponent voiceName={voiceName} setVoiceName={setVoiceName} />
              <button
                onClick={handleSaveAndClose}
                className={`my-3 mt-6 ${voiceName.trim() === '' ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={voiceName.trim() === ''}>
                <span className="bg-button1 text-main4 font-nanumBold p-16 py-3 rounded-full">저장하기</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
