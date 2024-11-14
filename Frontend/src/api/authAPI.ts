import { BaseResponse } from '@/types/http/baseResponse';

import axiosInstance from './axiosInstance';

interface IReissueTokenResponse {
  token: string;
  userName: string;
  userId: number;
}

export const reissueToken = async (): Promise<BaseResponse<IReissueTokenResponse>> => {
  const response = await axiosInstance.post<BaseResponse<IReissueTokenResponse>>('/auth/reissue');
  return response.data;
};
