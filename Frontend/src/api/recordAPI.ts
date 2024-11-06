import { BaseResponse } from '@/types/http/baseResponse';
import { DiaryRequestBody, TrainingRequestBody } from '@/types/http/request';
import { DailyData, MonthlyData } from '@/types/http/response';

import axiosInstance from './axiosInstance';

// 캘린더 월별 조회
export const getMonthlyData = async (year: string, month: string): Promise<BaseResponse<MonthlyData>> => {
  const response = await axiosInstance.get<BaseResponse<MonthlyData>>('/diary/calendars', {
    params: { year, month },
  });
  return response.data;
};

// 캘린더 일별 조회(기록 상세)
export const getDailyData = async (year: string, month: string, day: string): Promise<BaseResponse<DailyData>> => {
  const response = await axiosInstance.get<BaseResponse<DailyData>>('/diary/calendars', {
    params: { year, month, day },
  });
  return response.data;
};

// 일상 기록 저장
export const postDailyData = async (data: DiaryRequestBody): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.post<BaseResponse<null>>('/diary/daily', data);
  return response.data;
};

// 훈련 종료(기록 저장)
export const postTrainingData = async (data: TrainingRequestBody): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.post<BaseResponse<null>>('/diary/training', data);
  console.log('훈련 기록 저장 성공');
  return response.data;
};
