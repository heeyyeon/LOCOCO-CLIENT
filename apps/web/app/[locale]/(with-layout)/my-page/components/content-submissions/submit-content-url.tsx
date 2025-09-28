import { useTranslations } from 'next-intl';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input-field';

import { ContentSubmissionsFormData } from '../../hooks/use-content-submissions';

interface SubmitContentUrlProps {
  formData: ContentSubmissionsFormData;
  errors: string | undefined;
  updatePostUrl: (
    campaignId: number,
    postUrl: string,
    contentLevel?: string
  ) => void;
}

export default function SubmitContentUrl({
  formData,
  errors,
  updatePostUrl,
}: SubmitContentUrlProps) {
  const t = useTranslations('myPage.contentSubmissions.submitContentUrl');
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.6rem]">
        <p className="title2 text-gray-800">{t('title')}</p>
        <p className="caption3 text-gray-500">{t('description')}</p>
      </div>
      <Input
        value={formData.postUrl}
        onChange={(e) =>
          formData.campaignId &&
          updatePostUrl(
            formData.campaignId,
            e.target.value,
            formData.contentLevel
          )
        }
        className="w-full"
      />
      {errors && <ErrorNotice message={errors} />}
    </section>
  );
}
