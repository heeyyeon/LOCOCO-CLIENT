import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input-field';

import { ContentSubmissionsFormData } from '../../types/contentSubmissions';

interface HashtagsInputProps {
  formData: ContentSubmissionsFormData;
  errors: { captionAndHashtags: string | undefined };
  updateCaptionAndHashtags: (captionAndHashtags: string) => void;
}

export default function HashtagsInput({
  formData,
  errors,
  updateCaptionAndHashtags,
}: HashtagsInputProps) {
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.6rem]">
        <p className="inter-title2 text-gray-800">
          Submit Your Caption & Hashtags
        </p>
        <p className="inter-caption3 text-gray-500">
          Please paste the exact caption and hashtags you used on
          Instagram/TikTok so we can verify your review post.
        </p>
      </div>
      <Input
        value={formData.captionAndHashtags}
        onChange={(e) => updateCaptionAndHashtags(e.target.value)}
        className="w-full"
      />
      {errors.captionAndHashtags && (
        <ErrorNotice message={errors.captionAndHashtags} />
      )}
    </section>
  );
}
