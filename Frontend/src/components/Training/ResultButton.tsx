'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

import { putTrainingData } from '@/api/recordAPI';
import { TrainingRequestBody } from '@/types/http/request';

import Button from '../Button';

interface ResultButtonProps {
  trainingType: string;
}

export default function ResultButton({ trainingType }: ResultButtonProps) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: TrainingRequestBody) => putTrainingData(data),
    onSuccess: () => {
      console.log('데이터 전송 성공');
      router.push('/training');
    },
    onError: error => {
      console.error('훈련 기록 전송 실패:', error);
    },
  });

  // 버튼 클릭 핸들러
  const handlePostTrainingRecord = () => {
    const trainingRecord: TrainingRequestBody = {
      trainingType,
    };

    // PUT 요청 실행
    mutation.mutate(trainingRecord);
  };

  return (
    <div className="w-full">
      <Button label="완료" onClick={handlePostTrainingRecord} />
    </div>
  );
}
