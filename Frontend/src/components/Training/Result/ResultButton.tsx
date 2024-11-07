'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postTrainingData } from '@/api/recordAPI';
import { TrainingRequestBody } from '@/types/http/request';
import Button from '@/components/Common/Button';

interface ResultButtonProps {
  trainingType: string;
}

export default function ResultButton({ trainingType }: ResultButtonProps) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: TrainingRequestBody) => postTrainingData(data),
    onSuccess: () => {
      console.log('훈련 기록 전송 성공');
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

    mutation.mutate(trainingRecord);
  };

  return (
    <div className="w-full">
      <Button label="완료" onClick={handlePostTrainingRecord} />
    </div>
  );
}
