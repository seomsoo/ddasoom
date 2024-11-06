import { DiaryRequestBody, TrainingRequestBody } from '@/types/http/request';

import axiosInstance from './axiosInstance';

// 캘린더 월별 조회
export const getMonthlyData = async (year: string, month: string) => {
  const response = await axiosInstance.get('/diary/calendars', {
    params: { year, month },
  });
  return response.data;
};

// 캘린더 일별 조회(기록 상세)
export const getDailyData = async (year: string, month: string, day: string) => {
  const response = await axiosInstance.get('/diary/calendars', {
    params: { year, month, day },
  });
  return response.data.data;
};

// 일상 기록 저장
export const postDailyData = async (data: DiaryRequestBody) => {
  const response = await axiosInstance.post('/diary/daily', data);
  return response.data;
};

// 훈련 종료(기록 저장)
export const postTrainingData = async (data: TrainingRequestBody) => {
  const response = await axiosInstance.post('/diary/training', data);
  console.log('훈련 기록 저장 성공');
  return response.data;
};
