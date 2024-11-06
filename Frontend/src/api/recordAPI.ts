import { BaseResponse } from '@/types/http/baseResponse';
import { DiaryRequestBody, TrainingRequestBody } from '@/types/http/request';
import { DailyData, MonthlyData, ReportData } from '@/types/http/response';

import axiosInstance from './axiosInstance';

// 캘린더 월별 조회
export const getMonthlyData = async (year: string, month: string): Promise<BaseResponse<MonthlyData>> => {
  const response = await axiosInstance.get<BaseResponse<MonthlyData>>('/diary/calendars', {
    params: { year, month },
  });
  return response.data;
};

// 캘린더 일별 조회(기록 상세)
export const getDailyData = async (year: string, month: string, day: string): Promise<DailyData> => {
  const response = await axiosInstance.get<BaseResponse<DailyData>>('/diary/calendar', {
    params: { year, month, day },
  });
  return response.data.data;
};

// 일상 기록 저장
export const postDailyData = async (data: DiaryRequestBody): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.post<BaseResponse<null>>('/diary/daily', data);
  return response.data;
};

// 훈련 종료(기록 저장)
export const postTrainingData = async (data: TrainingRequestBody): Promise<BaseResponse<null>> => {
  const response = await axiosInstance.post<BaseResponse<null>>('/diary/training', data);
  return response.data;
};

// 월별 리포트 조회
export const getReportData = async (year: string, month: string): Promise<ReportData> => {
  const response = await axiosInstance.get<BaseResponse<ReportData>>(`/diary/report/${year}/${month}`);
  return response.data.data;
};
