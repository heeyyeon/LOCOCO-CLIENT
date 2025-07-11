import { getAccessToken } from './token';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestProps {
  endPoint: string;
  method: RequestMethod;
  data?: unknown;
  headers?: Record<string, string>;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const apiRequest = async ({
  endPoint,
  method = 'GET',
  data,
  headers,
}: ApiRequestProps) => {
  try {
    const requestUrl = `${BASE_URL}${endPoint}`;
    const accessToken = getAccessToken();
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (accessToken) {
      defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    const fetchOptions: RequestInit = {
      method,
      headers: defaultHeaders,
      credentials: 'include',
    };
    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }
    requestInterceptor();
    const response = await fetch(requestUrl, fetchOptions);
    responseInterceptor();
    if (!response.ok) {
      const error = await response.text();
      console.error('에러 내용 :', error);
    }

    const responseData = await response.json();
    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    console.error(error);
  }
};

const requestInterceptor = () => {};

const responseInterceptor = async (
  response: Response,
  originalRequest: ApiRequestProps
) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

  if (response.status === 401) {
    const refreshResponse = fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}api/auth/refresh/`
    );
  }
  //401 에러면
  //'https://52.79.208.129.nip.io/api/auth/refresh'로 refresh 토큰 재발급
  // 원래 하려고 했던 요청 이어서 다시 보내기
};
