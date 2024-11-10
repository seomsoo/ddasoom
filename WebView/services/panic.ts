import { instance } from "@/config/axios";

/** 발작 상황 저장(초기) */
export const postPanicAtFirst = async (panicFirstForm: PanicFirstForm) => {
  await instance.post<BaseResponse<void>>(`/api/emergency/panic`, panicFirstForm);
};

export const getPanicInfo = async () => {
  const { data } = await instance.get<BaseResponse<GetPanicInfoDto>>(`/api/emergency/panic-simple`);

  return data?.data;
};
