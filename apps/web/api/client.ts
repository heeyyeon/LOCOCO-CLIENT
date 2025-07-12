import { Auth } from './Auth';
import { Product } from './Product';
import { Youtube } from './Youtube';

// API 설정
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
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

// 마스터 토큰 (실제 토큰으로 변경 필요)
const MASTER_TOKEN =
  process.env.NEXT_PUBLIC_MASTER_TOKEN || 'your-master-token-here';

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
