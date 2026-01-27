'use client';

import { Button } from '@lococo/design-system/button';
import { useRouter } from 'next/navigation';

export default function AdminMainPage() {
  const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL;
  const router = useRouter();
  const handleGoLococoSite = () => {
    window.open(`${MAIN_URL}/ko`, '_blank', 'noopener,noreferrer');
  };

  const handleStartProductRegistration = () => {
    window.open(`${MAIN_URL}/ko/brand/create-campaign?role=admin`, '_blank', 'noopener,noreferrer');
  };

  const handleStartAdmin = () => {
    router.push('/campaign');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-semibold">LOCOCO Admin 메인</h1>
        <p className="text-gray-600 text-center">
          로그인 후 보이는 관리자 메인 화면입니다.
        </p>

        <div className="flex gap-4 mt-6">
          <Button
            color="primary"
            variant="outline"
            size="md"
            rounded="md"
            fontType="InterBody1"
            onClick={handleGoLococoSite}
          >
            Lococo 서비스
          </Button>
          <Button
            color="primary"
            variant="filled"
            size="md"
            rounded="md"
            fontType="InterBody1"
            onClick={handleStartProductRegistration}
          >
            캠페인 등록
          </Button>

          <Button
            color="primary"
            variant="filled"
            size="md"
            rounded="md"
            fontType="InterBody1"
            onClick={handleStartAdmin}
          >
            캠페인 관리
          </Button>
        </div>
      </div>
    </main>
  );
}


