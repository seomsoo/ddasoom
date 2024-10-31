type ErrorMsg = {
  message: string;
  status: number;
};

interface BaseResponse<T> {
  status: string;
  data: T;
  error: ErrorMsg | null;
}
