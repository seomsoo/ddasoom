'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { postDailyData } from '@/api/recordAPI';
import Button from '@/components/Button';
import RecordItem from '@/components/Record/DailyRecord/RecordItem';
import AlcoholSvg from '@/svgs/alcohol.svg';
import CaffeineSvg from '@/svgs/caffeine.svg';
import CigaretteSvg from '@/svgs/cigarette.svg';
import ExerciseSvg from '@/svgs/exercise.svg';
import { DiaryRequestBody } from '@/types/http/request';

interface WriteRecordProps {
  dateYear?: string;
  dateMonth?: string;
  dateDay?: string;
}

export default function WriteRecord({ dateYear, dateMonth, dateDay }: WriteRecordProps) {
  const router = useRouter();

  const [selectedIcons, setSelectedIcons] = useState<{ [key: string]: boolean }>({
    caffeine: false,
    cigarette: false,
    alcohol: false,
    exercise: false,
  });

  const [description, setDescription] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: DiaryRequestBody) => postDailyData(data),
    onSuccess: () => {
      console.log('일기 전송 성공');
      router.push(`/record?year=${dateYear}&month=${dateMonth}&day=${dateDay}`);
    },
    onError: error => {
      console.error('일기 전송 실패:', error);
    },
  });

  const handleIconClick = (iconId: string) => {
    setSelectedIcons(prevSelected => ({
      ...prevSelected,
      [iconId]: !prevSelected[iconId],
    }));
  };

  const formattedDate = `${dateYear ?? ''}-${dateMonth?.padStart(2, '0') ?? ''}-${dateDay?.padStart(2, '0') ?? ''}`;

  useEffect(() => {
    const isAnyIconSelected = Object.values(selectedIcons).some(selected => selected);
    setIsButtonEnabled(isAnyIconSelected || description.trim() !== '');
  }, [selectedIcons, description]);

  const handleAddDailyRecord = () => {
    const recordData: DiaryRequestBody = {
      date: formattedDate,
      alcohol: selectedIcons.alcohol,
      caffeine: selectedIcons.caffeine,
      smoking: selectedIcons.cigarette,
      exercise: selectedIcons.exercise,
      description: description.trim(),
    };

    mutation.mutate(recordData);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 500) {
      setDescription(inputText);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <p className="font-hakgyoansimR text-2xl">
        오늘 하루 <br />
        어떤 활동을 하셨나요?
      </p>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <RecordItem
          label="카페인"
          Icon={CaffeineSvg}
          isSelected={selectedIcons.caffeine}
          onClick={() => handleIconClick('caffeine')}
        />
        <RecordItem
          label="니코틴"
          Icon={CigaretteSvg}
          isSelected={selectedIcons.cigarette}
          onClick={() => handleIconClick('cigarette')}
        />
        <RecordItem
          label="알코올"
          Icon={AlcoholSvg}
          isSelected={selectedIcons.alcohol}
          onClick={() => handleIconClick('alcohol')}
        />
        <RecordItem
          label="운동"
          Icon={ExerciseSvg}
          isSelected={selectedIcons.exercise}
          onClick={() => handleIconClick('exercise')}
        />
      </div>

      <p className="font-hakgyoansimR text-2xl mt-7">오늘의 한 줄 일기</p>
      <div className="bg-main4 w-full h-60 rounded-xl border-2 border-main1 p-4 relative">
        <textarea
          placeholder="글을 입력하세요..."
          className="w-full h-full bg-transparent outline-none resize-none"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="absolute bottom-2 right-4 text-gray-500 text-sm">{description.length}/500</div>
      </div>

      <Button label="기록하기" disabled={!isButtonEnabled} onClick={handleAddDailyRecord} />
    </div>
  );
}
