import { instance } from "@/config/axios";

/** 회원가입 */
export const signUp = async (signupForm: SignupForm) => {
  await instance.post<BaseResponse<void>>("/api/users", signupForm);
};

/** 로그인 */
export const signIn = async (email: Email) => {
  const { data } = await instance.post<BaseResponse<SignInResponseDto>>("/api/users/login", { email });

  return data.data;
};
