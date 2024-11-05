import { DiaryRequestBody } from '@/types/http/request';

import axiosInstance from './axiosInstance';

// 캘린더 월별 조회
export const getMonthlyData = async (year: string, month: string) => {
  try {
    const response = await axiosInstance.get('/diary/calendars', {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    console.error('데이터 패치 실패:', error);
    throw error;
  }
};


// 일상 기록 저장
export const putDailyData = async (data: DiaryRequestBody) => {
  try {
    // const response = await axiosInstance.put('/diary/daily', data);
    const response = await axiosInstance.put('/record', data);

    return response.data;
  } catch (error) {
    console.error('데이터 전송 실패:', error);
    throw error;
  }
};
