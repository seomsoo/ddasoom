import axiosInstance from './axiosInstance';

// 캘린더 월별 조회
export const getMonthlyData = async ({ year, month }: { year: number; month: number }) => {
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
