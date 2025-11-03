import { useTranslations } from 'next-intl';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input-field';

import { ContentSubmissionsFormData } from '../../types/content-submissions';

interface HashtagsInputProps {
  formData: ContentSubmissionsFormData;
  errors: string | undefined;
  updateCaptionAndHashtags: (
    fieldId: string,
    captionAndHashtags: string
  ) => void;
  fieldId: string;
}

export default function HashtagsInput({
  formData,
  errors,
  updateCaptionAndHashtags,
  fieldId,
}: HashtagsInputProps) {
  const t = useTranslations('myPage.contentSubmissions.hashtagsInput');
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.6rem]">
        <p className="title2 text-gray-800">{t('title')}</p>
        <p className="caption3 text-gray-500">{t('description')}</p>
      </div>
      <Input
        value={formData.captionAndHashtags}
        onChange={(e) => updateCaptionAndHashtags(fieldId, e.target.value)}
        className="w-full"
      />
      {errors && <ErrorNotice message={errors} />}
    </section>
  );
}
