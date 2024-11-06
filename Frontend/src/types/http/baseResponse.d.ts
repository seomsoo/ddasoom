export type ErrorMsg = {
  message: string;
  status: number;
};

export interface BaseResponse<T> {
  status: string;
  data: T;
  error: ErrorMsg | null;
}
