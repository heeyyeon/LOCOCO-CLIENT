import { redirect } from 'i18n/navigation';

export default function page({ params }: { params: { locale: string } }) {
  redirect({
    href: '/my-page/my-campaign',
    locale: params.locale,
  });
}
