import { ApiResponse } from '@typescript-swagger/api-response';

export type LineLoginResponse = ApiResponse<LineLoginData>;

export interface LineLoginData {
  loginStatus: 'LOGIN' | 'REGISTER';
}
