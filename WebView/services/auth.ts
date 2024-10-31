import axios from "axios";

/** 회원가입 */
export const signUp = async (signupForm: SignupForm) => {
  await axios.post<BaseResponse<void>>("/api/users", signupForm);
};

/** 로그인 */
export const signIn = async (email: Email) => {
  const { data } = await axios.post<BaseResponse<SignInResponseDto>>(
    "/api/users/login",
    { email },
  );

  return data.data;
};
