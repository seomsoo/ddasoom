interface DdasoomError extends AxiosError {
  response?: {
    data: {
      error: {
        message: string;
        status: number;
      };
    };
  };
}

interface BaseResponse<T> {
  status: string;
  data: T;
  error: ErrorMsg | null;
}

interface SignupForm {
  name: Name;
  email: Email;
}

interface LoginForm {
  email: Email;
}

interface PanicFirstForm {
  duration: number;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  startDate: string;
}
