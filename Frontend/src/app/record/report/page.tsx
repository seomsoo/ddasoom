'use client';

import { motion } from 'framer-motion';

import Header from '@/components/Report/Header';
import MainContent from '@/components/Report/MainContent';

interface ReportPageProps {
  searchParams: { [key: string]: string | undefined };
}

const pageVariants = {
  initial: { x: '100%', opacity: 0 }, // 화면 오른쪽에서 시작
  animate: { x: 0, opacity: 1 }, // 화면 중앙으로 이동
  exit: { x: '-100%', opacity: 0 }, // 화면 왼쪽으로 사라짐
};

export default function ReportPage({ searchParams }: ReportPageProps) {
  const year = searchParams.year || new Date().getFullYear().toString();
  const month = searchParams.month || (new Date().getMonth() + 1).toString();

  return (
    <motion.div
      className="flex flex-col h-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <Header year={year} month={month} />
      <MainContent year={year} month={month} />
    </motion.div>
  );
}
