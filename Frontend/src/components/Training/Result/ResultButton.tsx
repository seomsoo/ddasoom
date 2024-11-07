'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { postTrainingData } from '@/api/recordAPI';
import Button from '@/components/Common/Button';
import ErrorModal from '@/components/Common/ErrorModal';
import { TrainingRequestBody } from '@/types/http/request';

interface ResultButtonProps {
  trainingType: string;
}

export default function ResultButton({ trainingType }: ResultButtonProps) {
  const router = useRouter();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: TrainingRequestBody) => postTrainingData(data),
    onSuccess: () => {
      console.log('훈련 기록 전송 성공');
      router.push('/training');
    },
    onError: error => {
      console.error('훈련 기록 전송 실패:', error);
      setIsErrorModalOpen(true);
    },
  });

  // 버튼 클릭 핸들러
  const handlePostTrainingRecord = () => {
    const trainingRecord: TrainingRequestBody = {
      trainingType,
    };

    mutation.mutate(trainingRecord);
  };

  const handleRetry = () => {
    setIsErrorModalOpen(false);
    handlePostTrainingRecord();
  };

  return (
    <div className="w-full">
      {isErrorModalOpen && <ErrorModal onClose={() => setIsErrorModalOpen(false)} onRetry={handleRetry} />}
      <Button label="완료" onClick={handlePostTrainingRecord} />
    </div>
  );
}
