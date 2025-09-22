import { redirect } from 'i18n/navigation';

export default function page({ params }: { params: { locale: string } }) {
  redirect({
    href: '/brand/campaign',
    locale: params.locale,
  });
}
