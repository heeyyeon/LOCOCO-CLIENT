import { Admin } from './Admin';
import { Auth } from './Auth';
import { Product } from './Product';
import { ProductLike } from './ProductLike';
import { Review } from './Review';
import { ReviewLike } from './ReviewLike';
import { Youtube } from './Youtube';

// API 설정
const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://52.79.208.129.nip.io',
  securityWorker: (token: string | null) => {
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return {};
  },
};

// 마스터 토큰 (환경변수에서 가져옴)
const MASTER_TOKEN =
  process.env.NEXT_PUBLIC_MASTER_TOKEN ||
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMyIsImlhdCI6MTc1MjQ3MTI2NCwiZXhwIjoxNzUyNDc0ODY0LCJpZCI6MTMsInJvbGUiOiJST0xFX1VTRVIiLCJsaW5lSWQiOiIxMyJ9.yNPKEoCYDXy3klEWWX3J2xY3XotzPLxB20b2-1C4vb8';

// API 클라이언트 인스턴스 생성
export const productApi = new Product({
  baseUrl: API_CONFIG.baseUrl,
  securityWorker: () => API_CONFIG.securityWorker(MASTER_TOKEN),
});

export const authApi = new Auth({
  baseUrl: API_CONFIG.baseUrl,
  securityWorker: () => API_CONFIG.securityWorker(MASTER_TOKEN),
});

export const youtubeApi = new Youtube({
  baseUrl: API_CONFIG.baseUrl,
  securityWorker: () => API_CONFIG.securityWorker(MASTER_TOKEN),
});

export const reviewApi = new Review({
  baseUrl: API_CONFIG.baseUrl,
  securityWorker: () => API_CONFIG.securityWorker(MASTER_TOKEN),
});

export const reviewLikeApi = new ReviewLike({
  baseUrl: API_CONFIG.baseUrl,
  securityWorker: () => API_CONFIG.securityWorker(MASTER_TOKEN),
});

export const productLikeApi = new ProductLike({
  baseUrl: API_CONFIG.baseUrl,
  securityWorker: () => API_CONFIG.securityWorker(MASTER_TOKEN),
});

export const adminApi = new Admin({
  baseUrl: API_CONFIG.baseUrl,
  securityWorker: () => API_CONFIG.securityWorker(MASTER_TOKEN),
});
