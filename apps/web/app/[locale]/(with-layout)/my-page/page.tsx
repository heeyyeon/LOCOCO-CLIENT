import { redirect } from 'i18n/navigation';

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  redirect({
    href: '/my-page/my-campaign',
    locale: locale,
  });
}
