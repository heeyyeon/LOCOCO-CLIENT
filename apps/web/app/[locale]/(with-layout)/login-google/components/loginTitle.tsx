import { useTranslations } from 'next-intl';

export default function LoginTitle({
  authType = 'login',
}: {
  authType?: 'login' | 'signup';
}) {
  const t = useTranslations('loginGoogle');

  return (
    <section className="text-center">
      <h1 className="head3 mb-[1.6rem] font-bold text-pink-500">
        {t('title')}
      </h1>
      <div className="caption2 font-medium text-gray-800">
        {authType === 'login' ? (
          <p>{t('loginMessage')}</p>
        ) : (
          <>
            <p>{t('signupMessage')}</p>
            <p>{t('signupNote')}</p>
          </>
        )}
      </div>
    </section>
  );
}
