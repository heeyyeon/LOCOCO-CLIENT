// API 응답 기본 구조
export interface ApiResponse<T> {
  success?: boolean;
  status?: number;
  message?: string;
  data?: T;
}
