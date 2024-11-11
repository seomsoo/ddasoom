'use client';

import React, { useState } from 'react';
import SettingSvg from '@/svgs/setting.svg';
import SettingModal from '@/components/Training/Breath/SettingModal';
import SettingContent from './SettingContent';

export default function SettingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={handleOpenModal}>
        <SettingSvg />
      </button>
      <SettingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ContentComponent={() => <SettingContent onClose={handleCloseModal} />}
      />
    </>
  );
}
