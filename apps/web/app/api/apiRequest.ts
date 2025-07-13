import { getAccessToken, removeAccessToken, setAccessToken } from './token';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestProps {
  endPoint: string;
  method?: RequestMethod;
  data?: unknown;
  headers?: Record<string, string>;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 
 * @param endPoint 엔드포인트 작성 ex.'api/youtube/trends'
 * @param method api의 method ex.'GET', 'POST', 'DELETE'...
 * @param data api 호출 data field에 넣을 값
 * @param headers api header field에 넣을 값 ex. headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
 * @returns 
 */
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
    const response = await fetch(requestUrl, fetchOptions);
    const interceptedResponse = await responseInterceptor(response, {
      endPoint,
      method,
      data,
      headers,
    });

    if (interceptedResponse) {
      return interceptedResponse;
    }

    if (!response.ok) {
      const error = await response.text();
      console.error('에러 :', error);
      return error;
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

const responseInterceptor = async (
  response: Response,
  originalRequest: ApiRequestProps
) => {
  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}api/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const refreshData = await refreshResponse.json();

    if (refreshResponse.ok) {
      setAccessToken(refreshData.accessToken);
      const retryHeader: Record<string, string> = {
        'Content-Type': 'application/json',
        ...originalRequest.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      };

      const fetchOptions: RequestInit = {
        method: originalRequest.method,
        headers: retryHeader,
        credentials: 'include',
      };

      if (originalRequest.data && originalRequest.method !== 'GET') {
        fetchOptions.body = JSON.stringify(originalRequest.data);
      }

      const retryResponse = await fetch(
        `${BASE_URL}${originalRequest.endPoint}`,
        fetchOptions
      );

      if (retryResponse.ok) {
        const retryData = await retryResponse.json();
        return {
          data: retryData,
          status: retryResponse.status,
          ok: retryResponse.ok,
        };
      } else {
        const retryError = await retryResponse.text();
        console.error('재시도 에러 :', retryError);
        return retryError;
      }
    }
  } else if (response.status === 403) {
    removeAccessToken();
    // logout api
    return null;
  } else {
    return null;
  }
};
