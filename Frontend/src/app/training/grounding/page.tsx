'use client';

import { motion } from 'framer-motion';

import background from '@/components/BackGround/Background.module.css';
import Header from '@/components/Common/Header';
import MainContent from '@/components/Training/Grounding/MainContent';

const pageVariants = {
  initial: { x: '100%', opacity: 0 }, // 화면 오른쪽에서 시작
  animate: { x: 0, opacity: 1 }, // 화면 중앙으로 이동
  exit: { x: '-100%', opacity: 0 }, // 화면 왼쪽으로 사라짐
};

export default function GroundingTrainingPage() {
  return (
    <motion.div
      className={`${background.background6} overflow-hidden h-full inset-0 px-4 pt-4 absolute`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <Header label="그라운딩" />
      <MainContent />
    </motion.div>
  );
}
